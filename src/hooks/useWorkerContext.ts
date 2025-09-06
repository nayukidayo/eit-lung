import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { usb } from '../lib/usb'
import type { PluginListenerHandle } from '@capacitor/core'

type Msg = {
  br: number
  tv1: number
  tv2: number
  tv3: number
  tv4: number
  roi0: number
  roi1: number
  roi2: number
  roi3: number
  roi4: number
  dt: Uint8ClampedArray<ArrayBuffer>
}

type Dian = {
  d0: number[]
  d1: number[]
  d2: number[]
  d3: number[]
  d4: number[]
}

export type WorkerContextValue = {
  dian?: Dian
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
  const [dian, setDian] = useState<Dian>()

  useEffect(() => {
    worker.current = new Worker(new URL('../lib/worker.ts', import.meta.url), { type: 'module' })
    worker.current.onmessage = onmessage
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

  const onmessage = (e: MessageEvent<Msg>) => {
    setMsg(e.data)
    setDian(prev => {
      if (!prev) {
        return {
          d0: [e.data.roi0],
          d1: [e.data.roi1],
          d2: [e.data.roi2],
          d3: [e.data.roi3],
          d4: [e.data.roi4],
        }
      }
      if (prev.d0.length >= 500) {
        prev.d0.shift()
        prev.d1.shift()
        prev.d2.shift()
        prev.d3.shift()
        prev.d4.shift()
      }
      prev.d0.push(e.data.roi0)
      prev.d1.push(e.data.roi1)
      prev.d2.push(e.data.roi2)
      prev.d3.push(e.data.roi3)
      prev.d4.push(e.data.roi4)
      return { ...prev }
    })
  }

  const postMessage = (message: any, transfer: Transferable[] = []) => {
    worker.current?.postMessage(message, transfer)
  }

  return { dian, uell, msg, postMessage }
}
