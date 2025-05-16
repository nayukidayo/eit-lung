import { useEffect, useState } from 'react'
import { PluginListenerHandle } from '@capacitor/core'
import USB, { DataListener } from '../lib/usb-plugin'

const dataListener: DataListener = ret => {
  const arr = new Int16Array(ret.data)
}

export default function useUell() {
  const [uell, setUell] = useState<Int16Array>()

  useEffect(() => {
    let onData: PluginListenerHandle | undefined
    USB.addListener('data', dataListener).then(listener => {
      onData = listener
    })
    return () => {
      onData?.remove()
    }
  }, [])

  return uell
}
