import { useStore, StoreContext } from '../hooks/useStoreContext'
import { useEit, EitContext } from '../hooks/useEitContext'

type ProviderProps = {
  children: React.ReactNode
}

export default function Provider({ children }: ProviderProps) {
  const storeContextValue = useStore()
  const eitContextValue = useEit()

  return (
    <StoreContext value={storeContextValue}>
      <EitContext value={eitContextValue}>{children}</EitContext>
    </StoreContext>
  )
}
