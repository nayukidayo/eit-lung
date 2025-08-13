import { createContext, useContext, useState } from 'react'

const defaultStore = {
  uell: [] as number[],
  start: false,
  // 系统设置
  freq: '4',
  mode: '26,30',
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

type Store = typeof defaultStore

type StoreContextValue = {
  store: Store
  setStore: (value: Partial<Store>) => void
}

export const StoreContext = createContext<StoreContextValue>({} as StoreContextValue)

export default function useStoreContext() {
  return useContext(StoreContext)
}

export function useStore() {
  const [store, setStore] = useState<Store>(defaultStore)
  const mergeStore = (value: Partial<Store>) => setStore(prev => ({ ...prev, ...value }))
  return { store, setStore: mergeStore }
}
