import { createContext, useContext, useEffect, useRef, useState } from 'react'
import eit, { EitData } from '../lib/a'
import { usb } from '../lib/usb'
import type { PluginListenerHandle } from '@capacitor/core'

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

// const [dong, setDong] = useState<U8CA>()
// const [tv, setTv] = useState<U8CA>()
// const [roi, setRoi] = useState({ hu: 0, r0: 0, r1: 0, r2: 0, r3: 0, r4: 0 })
// const [dian, setDian] = useState({ d0: [], d1: [], d2: [], d3: [], d4: [] })
