import { createContext, useContext } from 'react'

export type Store = {
  // 系统设置
  jl: string
  cl: string
  hq: string
  hz: string
  sj: string
  kd: string
  // header
  lb: string
  hz_name: string
  hz_sex: string
  hz_age: string
}

export const initialStore: Store = {
  jl: '5',
  cl: '1',
  hq: '1',
  hz: '4',
  sj: '2',
  kd: '3',
  lb: '2',
  hz_name: '张三',
  hz_sex: '男',
  hz_age: '30',
}

export type StoreValue<T> = {
  store: T
  setStore: (store: Partial<T>) => void
}

export const StoreContext = createContext<StoreValue<Store>>({} as StoreValue<Store>)

export default function useStore() {
  return useContext(StoreContext)
}
