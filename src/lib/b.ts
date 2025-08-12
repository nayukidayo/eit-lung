import graph from './graph'

type Msg1 = {
  opcode: 'init' | 'uref' | 'cirs' | 'uell'
  uell: number[]
}

type Msg2 = {
  uref: number[]
  cirs: number[]
}

const msg: Msg2 = {
  uref: [],
  cirs: [],
}

self.onmessage = (e: MessageEvent<Msg1 & Msg2>) => {
  if (e.data.opcode === 'uell') {
    createImage(e.data.uell)
    return
  }
  if (e.data.opcode === 'init') {
    msg.uref = e.data.uref
    msg.cirs = e.data.cirs
    return
  }
  if (e.data.opcode === 'uref') {
    msg.uref = e.data.uref
    return
  }
  if (e.data.opcode === 'cirs') {
    msg.cirs = e.data.cirs
    return
  }
}

function greit(uell: number[], uref: number[], cirs: number[]) {
  const a = Array.from<number>({ length: 208 })
  for (let i = 0; i < a.length; i++) {
    a[i] = uell[i] - uref[i]
  }
  const b = Array.from<number>({ length: 2328 })
  for (let i = 0; i < 2328; i++) {
    let sum = 0
    for (let j = 0; j < 208; j++) {
      sum += cirs[i * 208 + j] * a[j]
    }
    b[i] = sum
  }
  return b
}

function createImage(uell: number[]) {
  if (uell.length !== 208 || msg.uref.length !== 208 || msg.cirs.length !== 484224) return
  greit(uell, msg.uref, msg.cirs)
  const a = new Uint8ClampedArray(64 * 64 * 4).fill(255)
  for (let i = 0; i < graph.length; i++) {
    a[graph[i] * 4] = 100
  }
  self.postMessage(a, { transfer: [a.buffer] })
}
