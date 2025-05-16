import { createContext, useContext } from 'react'

export const initialStore = {
  // 系统设置
  jl: '5',
  cl: '1',
  hq: '1',
  hz: '4',
  sj: '2',
  kd: '3',
  lb: '1',
  ro: '1',
  // 患者设置
  hz_name: '张三',
  hz_sex: '1',
  hz_age: '30',
}

export type Store = {
  [T in keyof typeof initialStore]: string
}

export type StoreValue = {
  store: Store
  setStore: (store: Partial<Store>) => void
}

export const StoreContext = createContext<StoreValue>({} as StoreValue)

export default function useStore() {
  return useContext(StoreContext)
}
