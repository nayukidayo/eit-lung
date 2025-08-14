import { useStore, StoreContext } from '../hooks/useStoreContext'
import { useWorker, WorkerContext } from '../hooks/useWorkerContext'

type ProviderProps = {
  children: React.ReactNode
}

export default function Provider({ children }: ProviderProps) {
  const storeContextValue = useStore()
  const workerContextValue = useWorker()

  return (
    <StoreContext value={storeContextValue}>
      <WorkerContext value={workerContextValue}>{children}</WorkerContext>
    </StoreContext>
  )
}
