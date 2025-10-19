import { createContext, useContext, useEffect, useRef, useState } from 'react'
import eit from '../lib/eit'
import { usb } from '../lib/usb'
import type { PluginListenerHandle } from '@capacitor/core'
import type { EitData } from '../lib/types'

type EitContextValue = EitData | null

export const EitContext = createContext<EitContextValue>(null)

export default function useEitContext() {
  return useContext(EitContext)
}

export function useEit() {
  const ref = useRef<PluginListenerHandle>(null)
  const [data, setData] = useState<EitContextValue>(null)

  useEffect(() => {
    const onData = (e: CustomEvent<EitData>) => setData(e.detail)
    eit.addEventListener('data', onData as EventListener)
    usb.addListener('data', e => eit.onUsbData(e.data)).then(h => (ref.current = h))
    return () => {
      eit.removeEventListener('data', onData as EventListener)
      ref.current?.remove()
    }
  }, [])

  return data
}
