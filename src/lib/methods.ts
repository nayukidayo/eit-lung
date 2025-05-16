const methods = {
  aaa() {},

  asd(a: number, b: number) {
    return a + b
  },

  zxc(a: string, b: number) {
    return '' + a + b
  },

  qwe(a: string): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('relay' + a)
      }, 10)
    })
  },
} as const

// const methods: { [T in Method]: (...args: Parameters<Methods[T]>) => ReturnType<Methods[T]> } =
//   _methods

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

export default methods

// =================
type z = {
  result: any
  transfer: Transferable[]
}
const a = {
  aaa() {},
  asd(a: number, b: number) {
    const r = {
      result: { q: a + b, w: 'qwe' },
      transfer: [] as Transferable[],
    }
    return r
  },
  qwe(a: string) {
    return {
      result: 'relay' + a,
      transfer: [] as Transferable[],
    }
  },
  zxc() {
    return new Promise<{result:string,transfer:Transferable[]}>(resolve => {
      setTimeout(() => {
        resolve({
          result: 'relay',
          transfer: [] as Transferable[],
        })
      }, 10)
    })
  },
}

// type b = typeof a

// type c = keyof b

// type d = Parameters<b[c]>

// type e = ReturnType<b[c]>

// type f<T extends c> = Omit<Exclude<ReturnType<b[T]>, void>, 'transfer'>

// type g<T extends c> = f<T>[keyof f<T>]

// type h = {
//   [T in c]: ReturnType<b[T]> extends void ? void : g<T>
// }

// type asdasd = Exclude<e, void>

// type j<T extends c> = Pick<Exclude<ReturnType<b[T]>, void>, 'result'>

// type i = {
//   [T in c]: ReturnType<b[T]> extends void ? void : j<T>[keyof j<T>]
// }

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export type RpcMethod<V = JsonValue> = (...args: any[]) => V | Promise<V>;

type ValidMethod<T, V> = T extends RpcMethod<V> ? T : never;

type RpcServiceProp<T, V> = T extends (...args: any) => any ? ValidMethod<T, V> : T

export type RpcService<T, V> = { [K in keyof T]: RpcServiceProp<T[K], V> }

type me<T> = T extends (...args: any) => any ? T : never

type obj<T> = {
  [K in keyof T]: me<T[K]>
}