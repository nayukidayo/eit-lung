import { roidc, roixx, graph } from './const'
import type { Config, F64A, Filter, Roi, WorkerData } from './types'

class EIT {
  private cirs?: number[]
  private uref?: number[]
  private roi?: Roi
  private filter?: Filter

  setConfig(config: Config) {
    const { cirs, uref, roi, filter } = config
    if (cirs) {
      const str = new TextDecoder().decode(cirs)
      this.cirs = str.split('\n', 2328 * 208).map(Number)
    }
    if (uref) {
      const str = new TextDecoder().decode(uref)
      this.uref = str.split('\n', 208).map(Number)
    }
    if (roi) this.roi = roi
    if (filter) this.filter = filter
  }

  private sxs: number[] = [] // x求和后的sx数组
  private fus: number[][] = [] // uell滤波后的fu数组
  private peek?: number[] // 峰值对应的fu
  private valley?: number[] // 谷值对应的fu
  private valTime?: number // 谷值时间
  private breathe: number = 0 // 呼吸速率

  setUell(uell: number[]) {
    if (!this.cirs || !this.uref || !this.roi || !this.filter) return

    // 1. 滤波
    const fu = this.filtering(uell)
    // 2. 算法
    const x = this.greit(fu, this.uref, this.cirs)
    // 3. 求和
    const dian = this.calcDian(x)
    // 4. 峰谷 5. 做差 6. 算法 7. 画图
    const tv = this.calcTV(dian[0], fu)
    const dong = this.draw(x)
    const roi = this.calcRoi(dian)

    const data = { dian, tv, dong, roi } as WorkerData
    data.uell = new Float64Array(uell)
    const transfer = [dian.buffer, dong.buffer, roi.buffer, data.uell.buffer]
    if (tv) transfer.push(tv.buffer)
    self.postMessage(data, { transfer })
  }

  private filtering(uell: number[]) {
    switch (this.filter) {
      case 'smooth':
        return this.smooth(this.smooth(this.smooth(uell)))
      case 'lowpass':
        return this.lowpass(uell)
      default:
        return uell
    }
  }

  private calcDian(x: number[]) {
    const a = new Float64Array(5)
    const b = this.roi === 'dc' ? roidc : roixx
    for (let i = 0; i < x.length; i++) {
      a[b[i]] += x[i]
    }
    a[0] = a[1] + a[2] + a[3] + a[4]
    return a
  }

  private calcRoi(dian: F64A) {
    const a = new Float64Array(6)
    a[0] = this.breathe
    a[1] = 100
    a[2] = (dian[1] / dian[0]) * 100
    a[3] = (dian[2] / dian[0]) * 100
    a[4] = (dian[3] / dian[0]) * 100
    a[5] = (dian[4] / dian[0]) * 100
    return a
  }

  private calcTV(sx: number, fu: number[]) {
    this.sxs.push(sx)
    this.fus.push(fu)
    if (this.sxs.length < 5) return
    const [a, b, c, d, e] = this.sxs
    if (a < b && b < c && c > d && d > e) {
      this.peek = this.fus[2]
    }
    if (a > b && b > c && c < d && d < e) {
      const now = Date.now()
      if (this.valley) {
        this.breathe = 60000 / (now - this.valTime!)
      }
      this.valley = this.fus[2]
      this.valTime = now
    }
    this.sxs.shift()
    this.fus.shift()
    if (!this.peek || !this.valley) return
    const s = this.sub(this.peek, this.valley)
    this.peek = undefined
    this.valley = undefined
    const g = this.greit(s, this.uref!, this.cirs!)
    return this.draw(g)
  }

  private draw(x: number[]) {
    const min = Math.min(...x)
    const max = Math.max(...x)
    const a = new Uint8ClampedArray(64 * 64 * 4).fill(255)
    for (let i = 0; i < x.length; i++) {
      const b = ((x[i] - min) / (max - min)) * 255
      a[graph[i] * 4] = b
      a[graph[i] * 4 + 1] = (255 - b) / 2
      a[graph[i] * 4 + 2] = 255 - b
    }
    return a
  }

  private smooth(uell: number[], size = 2) {
    const a = Array<number>(uell.length)
    for (let i = 0; i < uell.length; i++) {
      let b = 0
      let c = 0
      for (let j = Math.max(0, i - size); j <= Math.min(uell.length - 1, i + size); j++) {
        b += uell[j]
        c += 1
      }
      a[i] = b / c
    }
    return a
  }

  private lowpass(uell: number[], fpass = 1, fs = 20, N = 101) {
    const fc = fpass / (fs / 2)
    const half = Math.floor((N - 1) / 2)
    const h = Array(N)
    for (let i = 0; i < N; i++) {
      const n = i - half
      if (n === 0) {
        h[i] = fc
      } else {
        h[i] = Math.sin(Math.PI * fc * n) / (Math.PI * n)
      }
      h[i] *= 0.54 - 0.46 * Math.cos((2 * Math.PI * i) / (N - 1))
    }
    const L = uell.length
    const y = Array(L).fill(0)
    const x_padded = Array(L + 2 * half).fill(0)
    for (let i = 0; i < L; i++) {
      x_padded[i + half] = uell[i]
    }
    for (let i = 0; i < L; i++) {
      let sum = 0
      for (let j = 0; j < N; j++) {
        sum += x_padded[i + j] * h[j]
      }
      y[i] = sum
    }
    return y
  }

  private greit(uell: number[], uref: number[], cirs: number[]) {
    const a = this.sub(uell, uref)
    const b = Array<number>(2328)
    for (let i = 0; i < 2328; i++) {
      let c = 0
      for (let j = 0; j < 208; j++) {
        c += cirs[i * 208 + j] * a[j]
      }
      b[i] = c
    }
    return b
  }

  private sub(v1: number[], v2: number[]) {
    const a = Array<number>(v1.length)
    for (let i = 0; i < a.length; i++) {
      a[i] = v1[i] - v2[i]
    }
    return a
  }
}

const eit = new EIT()

self.onmessage = (e: MessageEvent) => {
  const { opcode } = e.data
  switch (opcode) {
    case 'uell':
      eit.setUell(e.data.payload)
      break
    case 'config':
      eit.setConfig(e.data.payload)
      break
    default:
      console.log('[opcode]', opcode)
  }
}
