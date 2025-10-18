/* oxlint-disable no-new-array */

import { roidc, roixx, graph } from './constant'
import cirs from './cirs'
import uref from './uref'

export type F64A = Float64Array<ArrayBuffer>
export type U8CA = Uint8ClampedArray<ArrayBuffer>

export type Msg = {
  cond: F64A
  condr: F64A
  dong: U8CA
  tv?: U8CA
}

export type Roi = 'dc' | 'xx'

export type Filter = 'none' | 'smooth' | 'lowpass'

export default class EIT {
  private cirs?: F64A
  private uref?: F64A
  private cond?: F64A
  private condr?: F64A
  private conds: number[] = []
  private uellfs: number[][] = []
  private peek?: number[]
  private valley?: number[]
  private roi: Roi = 'dc'
  private filter: Filter = 'smooth'

  constructor() {
    this.cirs = new Float64Array(cirs)
    this.uref = new Float64Array(uref)
  }

  setCirs(cirs: F64A) {
    this.cirs = cirs
  }

  setUref(uref: F64A) {
    this.uref = uref
  }

  setRoi(roi: Roi) {
    this.roi = roi
  }

  setFilter(filter: Filter) {
    this.filter = filter
  }

  run(uell: number[]): Msg {
    if (!this.cirs || !this.uref) {
      throw new Error('cirs or uref is not set')
    }
    const uellf = this.filtering(uell)
    this.cond = this.greit(uellf, this.uref, this.cirs)
    this.condr = this.sumCond(this.cond)
    this.peekValley(this.condr[0], uellf)
    return {
      cond: this.cond,
      condr: this.condr,
      dong: this.draw(this.cond),
      tv: this.calcTV(),
    }
  }

  calcTV() {
    if (!this.peek || !this.valley) return
    const a = this.sub(this.peek, this.valley)
    const b = this.greit(a, this.uref!, this.cirs!)
    this.peek = undefined
    this.valley = undefined
    return this.draw(b)
  }

  private draw(cond: F64A) {
    const a = new Uint8ClampedArray(64 * 64 * 4).fill(255)
    for (let i = 0; i < cond.length; i++) {
      a[graph[i] * 4] = 100
    }
    return a
  }

  private peekValley(x: number, uellf: number[]) {
    this.conds.push(x)
    this.uellfs.push(uellf)
    if (this.conds.length < 5) return
    const [a, b, c, d, e] = this.conds
    if (a < b && b < c && c > d && d > e) {
      this.peek = this.uellfs[2]
    }
    if (a > b && b > c && c < d && d < e) {
      this.valley = this.uellfs[2]
    }
    this.conds.shift()
    this.uellfs.shift()
  }

  private sumCond(cond: F64A) {
    const a = new Float64Array(5)
    const b = this.roi === 'dc' ? roidc : roixx
    for (let i = 0; i < cond.length; i++) {
      a[b[i]] += cond[i]
    }
    a[0] = a[1] + a[2] + a[3] + a[4]
    return a
  }

  private filtering(uell: number[]) {
    switch (this.filter) {
      case 'smooth':
        return this.smooth(uell)
      case 'lowpass':
        return this.lowpass(uell)
      default:
        return uell
    }
  }

  private smooth(uell: number[], size = 2) {
    const a = new Array<number>(uell.length)
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

  private lowpass(uell: number[]) {
    return uell
  }

  private greit(uell: number[], uref: F64A, cirs: F64A) {
    const a = this.sub(uell, uref)
    const b = new Float64Array(2328)
    for (let i = 0; i < 2328; i++) {
      let c = 0
      for (let j = 0; j < 208; j++) {
        c += cirs[i * 208 + j] * a[j]
      }
      b[i] = c
    }
    return b
  }

  private sub(v1: F64A | number[], v2: F64A | number[]) {
    const a = new Array<number>(v1.length)
    for (let i = 0; i < a.length; i++) {
      a[i] = v1[i] - v2[i]
    }
    return a
  }
}
