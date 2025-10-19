import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { formatNow, toFixed } from './utils'
import { usb } from './usb'
import type { WorkerData, Config, EitData, U8CA, Dian } from './types'


class EIT extends EventTarget {
  private worker: Worker
  private uells: number[][] = []
  private tv?: U8CA
  private dian: Dian = {
    time: [],
    data: [[], [], [], [], []],
  }

  constructor() {
    super()
    this.worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
    this.worker.onmessage = this.onWorkerMessage.bind(this)
    this.initConfig()
  }

  private onWorkerMessage(e: MessageEvent<WorkerData>) {
    const { uell, dong, tv, roi, dian } = e.data
    const detail = { uell, dong } as EitData
    this.dian.time.push(Math.trunc(Date.now()) / 1000)
    this.dian.data[0].push(dian[0])
    this.dian.data[1].push(dian[1])
    this.dian.data[2].push(dian[2])
    this.dian.data[3].push(dian[3])
    this.dian.data[4].push(dian[4])
    if (this.dian.time.length > 500) {
      this.dian.time.shift()
      this.dian.data[0].shift()
      this.dian.data[1].shift()
      this.dian.data[2].shift()
      this.dian.data[3].shift()
      this.dian.data[4].shift()
    }
    detail.dian = this.dian
    detail.roi = roi.map(v => toFixed(v, 2))
    detail.tv = tv ? tv : this.tv
    this.dispatchEvent(new CustomEvent('data', { detail }))
    if (tv) this.tv = tv
  }

  private async initConfig() {
    const [cirs, uref] = await Promise.all([
      fetch('/matrix/cirs.txt').then(res => res.arrayBuffer()),
      fetch('/matrix/uref.txt').then(res => res.arrayBuffer()),
    ])
    this.setConfig({ cirs, uref, roi: 'xx', filter: 'smooth' })
  }

  setConfig(config: Config) {
    const transfer: Transferable[] = []
    const { cirs, uref } = config
    if (cirs) transfer.push(cirs)
    if (uref) transfer.push(uref)
    this.worker.postMessage({ opcode: 'config', payload: config }, transfer)
  }

  onUsbData(uell: number[]) {
    this.uells.push(uell)
    if (this.uells.length > 500) this.uells.shift()
    this.worker.postMessage({ opcode: 'uell', payload: uell })
  }

  start(mode1: number, mode2: number, freq: number) {
    this.uells = []
    this.tv = undefined
    this.dian = { time: [], data: [[], [], [], [], []] }
    return usb.start({ mode1, mode2, freq })
  }

  stop() {
    return usb.stop()
  }

  loadData(ab: ArrayBuffer) {
    return new Promise<void>(res => {
      let start = 0
      const str = new TextDecoder().decode(ab)
      const ticker = window.setInterval(() => {
        const end = str.indexOf('\n', start)
        if (end === -1) {
          clearInterval(ticker)
          return res()
        }
        const uell = str.substring(start, end).split(' ', 208).map(Number)
        if (uell.length === 208) {
          this.onUsbData(uell)
        }
        start = end + 1
      }, 33)
    })
  }

  async saveData(name: string) {
    const path = `EIT_LUNG/${name}/${formatNow()}`
    await Filesystem.mkdir({
      path,
      directory: Directory.Documents,
      recursive: true,
    })
    this.dispatchEvent(new CustomEvent('saveData', { detail: path }))
  }
}

export default new EIT()
