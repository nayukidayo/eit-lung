import EIT, { Roi, Filter } from './eit'

const eit = new EIT()

type OP = {
  opcode: string
  roi: Roi
  filter: Filter
  uell: number[]
  uref: number[]
}

self.onmessage = (e: MessageEvent<OP>) => {
  const { opcode } = e.data
  if (opcode === 'init') {
    eit.setRoi(e.data.roi)
    eit.setFilter(e.data.filter)
    return
  }
  if (opcode === 'uref') {
    eit.setUref(e.data.uref)
  }
  if (opcode === 'run') {
    const msg = eit.run(e.data.uell)
    self.postMessage(msg, { transfer: [msg.dt.buffer] })
    return
  }
}
