export type Roi = 'dc' | 'xx'
export type Filter = 'none' | 'smooth' | 'lowpass'

export type Config = {
  cirs?: ArrayBuffer
  uref?: ArrayBuffer
  roi?: Roi
  filter?: Filter
}

export type F64A = Float64Array<ArrayBuffer>
export type U8CA = Uint8ClampedArray<ArrayBuffer>
export type Dian = [number[], number[], number[], number[], number[]]

export type EitData = {
  uell: F64A
  dong: U8CA
  tv?: U8CA
  roi: F64A
  dian: Dian
}

export type WorkerData = {
  uell: F64A
  dong: U8CA
  tv?: U8CA
  roi: F64A
  dian: F64A
}

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

  // --------

  private uell?: number[]

  async setUell(uell: number[]) {
    // console.log(this.cirs, this.uref, this.uell, this.roi, this.filter)
    this.uell = uell

    const data = {} as WorkerData
    data.uell = new Float64Array(this.uell)
    data.dong = new Uint8ClampedArray(64 * 64 * 4).fill(255)
    data.tv = new Uint8ClampedArray(64 * 64 * 4).fill(255)
    data.roi = new Float64Array([1, 100, 25, 25, 25, 25])
    data.dian = new Float64Array([1, 2, 3, 4, 5])
    const transfer = [data.uell.buffer, data.dong.buffer, data.roi.buffer, data.dian.buffer]
    if (data.tv) transfer.push(data.tv.buffer)
    self.postMessage(data, { transfer })
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
