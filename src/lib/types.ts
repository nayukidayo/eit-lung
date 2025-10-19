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

export type WorkerData = {
  uell: F64A
  dong: U8CA
  tv?: U8CA
  roi: F64A
  dian: F64A
}

export type Dian = {
  time: number[]
  data: [number[], number[], number[], number[], number[]]
}

export type EitData = {
  uell: F64A
  dong: U8CA
  tv?: U8CA
  roi: F64A
  dian: Dian
}
