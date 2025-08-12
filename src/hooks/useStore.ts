import { createContext, useContext } from 'react'

export const initialStore = {
  uell: [] as number[],
  start: false,
  // 系统设置
  jl: '4',
  cl: '26,30',
  hq: '1',
  hz: '4',
  sj: '2',
  kd: '3',
  filter: 'no',
  roi: 'dc',
  // 患者设置
  hz_name: '张三',
  hz_sex: '1',
  hz_age: '30',
}

export type Store = typeof initialStore

export type StoreValue = {
  store: Store
  setStore: (store: Partial<Store>) => void
}

export const StoreContext = createContext<StoreValue>({} as StoreValue)

export default function useStore() {
  return useContext(StoreContext)
}
