import { useStore, StoreContext } from '../hooks/useStoreContext'
import { useWorker, WorkerContext } from '../hooks/useWorkerContext'

type ProviderProps = {
  children: React.ReactNode
}

export default function Provider({ children }: ProviderProps) {
  const { store, setStore } = useStore()
  const { msg, postMessage } = useWorker()

  return (
    <StoreContext value={{ store, setStore }}>
      <WorkerContext value={{ msg, postMessage }}>{children}</WorkerContext>
    </StoreContext>
  )
}
