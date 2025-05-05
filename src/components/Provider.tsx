import { useState } from 'react'
import { Store, StoreContext, initialStore } from '../hooks/useStore'

type ProviderProps = {
  children: React.ReactNode
}

export default function Provider({ children }: ProviderProps) {
  const [store, setStore] = useState<Store>(initialStore)

  const mergeStore = (obj: Partial<Store>) => setStore(prev => ({ ...prev, ...obj }))

  return (
    <StoreContext.Provider value={{ store: store, setStore: mergeStore }}>
      {children}
    </StoreContext.Provider>
  )
}
