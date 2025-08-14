import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { usb } from '../lib/usb'
import type { PluginListenerHandle } from '@capacitor/core'

type Msg = {
  r1: number
  r2: number
  r3: number
  r4: number
  rg: number
  dt: Uint8ClampedArray<ArrayBuffer>
}

export type WorkerContextValue = {
  uell?: number[]
  msg?: Msg
  postMessage: (message: any, transfer?: Transferable[]) => void
}

export const WorkerContext = createContext<WorkerContextValue>({} as WorkerContextValue)

export default function useWorkerContext() {
  return useContext(WorkerContext)
}

export function useWorker(): WorkerContextValue {
  const worker = useRef<Worker>(null)
  const listener = useRef<PluginListenerHandle>(null)
  const [msg, setMsg] = useState<Msg>()
  const [uell, setUell] = useState<number[]>()

  useEffect(() => {
    worker.current = new Worker(new URL('../lib/worker.ts', import.meta.url), { type: 'module' })
    worker.current.onmessage = (e: MessageEvent<Msg>) => {
      setMsg(e.data)
    }
    usb
      .addListener('data', e => {
        worker.current?.postMessage({ opcode: 'run', uell: e.data })
        setUell(e.data)
      })
      .then(cb => {
        listener.current = cb
      })
    return () => {
      worker.current?.terminate()
      listener.current?.remove()
    }
  }, [])

  const postMessage = (message: any, transfer: Transferable[] = []) => {
    worker.current?.postMessage(message, transfer)
  }

  return { uell, msg, postMessage }
}
