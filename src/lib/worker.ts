import EIT, { F64A, Roi, Filter } from './eit2'

const eit = new EIT()

type OP = {
  opcode: string
  roi: Roi
  filter: Filter
  cirs: F64A
  uref: F64A
  uell: number[]
}

self.onmessage = (e: MessageEvent<OP>) => {
  const { opcode } = e.data
  if (opcode === 'init') {
    // eit.setCirs(e.data.cirs)
    // eit.setUref(e.data.uref)
    eit.setRoi(e.data.roi)
    eit.setFilter(e.data.filter)
    return
  }
  if (opcode === 'uref') {
    eit.setUref(e.data.uref)
    return
  }
  if (opcode === 'cirs') {
    eit.setUref(e.data.cirs)
    return
  }
  if (opcode === 'roi') {
    eit.setRoi(e.data.roi)
    return
  }
  if (opcode === 'filter') {
    eit.setFilter(e.data.filter)
    return
  }
  if (opcode === 'run') {
    try {
      const msg = eit.run(e.data.uell)
      const transfer = [msg.cond.buffer, msg.condr.buffer, msg.dong.buffer]
      if (msg.tv) transfer.push(msg.tv.buffer)
      self.postMessage(msg, { transfer })
    } catch (err) {
      console.log(err)
    }
  }
}
