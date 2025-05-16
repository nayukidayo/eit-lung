const methods = {
  aaa() {},

  asd(a: number, b: number) {
    return a + b
  },

  zxc(a: string, b: number) {
    return '' + a + b
  },
} as const

export type Methods = typeof methods

export type Method = keyof Methods

export type Params = {
  [T in keyof Methods]: Parameters<Methods[T]>
}

export type Returns = {
  [T in keyof Methods]: ReturnType<Methods[T]>
}

export type ReqObj = {
  id: string
  method: Method
  params: Parameters<Methods[Method]>
}

export type ResObj = {
  id: string
  error?: string
  result?: any
}

type ss = (...args: any) => any

self.onmessage = (e: MessageEvent<ReqObj>) => {
  const { id, method, params } = e.data
  // methods[method](...params)
  mm[method](...params)
  // const fn: ss = methods[method]
  // new Promise(resolve => resolve(fn(...params)))
  //   .then(result => {
  //     sendMessage({ id, result })
  //   })
  //   .catch(error => sendMessage({ id, error }))
}

function sendMessage(message: ResObj, transfer: Transferable[] = []) {
  self.postMessage(message, { transfer })
}

type me<T> = T extends (...args: any) => any ? T : never

type obj<T> = {
  [K in keyof T]: (...args: any) => any
}

const mm: obj<typeof methods> = methods

