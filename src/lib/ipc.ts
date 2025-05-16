import type { Method, Params, Returns, ReqObj, ResObj } from './methods'

class IPC {
  private worker: Worker
  private callback = new Map<string, (data: ResObj) => void>()

  constructor(worker: Worker) {
    this.worker = worker
    this.worker.onmessage = this.onmessage
  }

  private onmessage = (e: MessageEvent<ResObj>) => {
    this.callback.get(e.data.id)?.(e.data)
    this.callback.delete(e.data.id)
  }

  request = <T extends Method>(method: T, params: Params[T], transfer: Transferable[] = []) => {
    return new Promise<Returns[T]>((resolve, reject) => {
      const message: ReqObj = { id: Math.random().toString(), method, params }
      this.worker.postMessage(message, transfer)
      this.callback.set(message.id, ({ error, result }: ResObj) => {
        error === undefined ? resolve(result) : reject(error)
      })
    })
  }
}

const worker = new Worker(new URL('./worker.ts', import.meta.url), {
  type: 'module',
})

export default new IPC(worker)
