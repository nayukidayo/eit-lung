import { useEffect, useState } from 'react'
import USB from '../lib/usb-plugin'
import { IonButton } from '@ionic/react'
import { PluginListenerHandle } from '@capacitor/core'
// import cs from './Page.module.css'

type PageProps = {}

export default function Page({}: PageProps) {
  const [val, setVal] = useState<{ value: string } | null>(null)

  const handleClick = async () => {
    const ret = await USB.open({ productId: Date.now(), vendorId: 5678 })
    console.log('ret', JSON.stringify(ret))
    setVal(ret)
  }

  const handleStart = async () => {
    console.log('start')
    try {
      await USB.start({ mode0: 26, mode1: 30, freq: 4 })
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleStop = async () => {
    await USB.stop()
    console.log('stop')
  }

  const [t, sett] = useState('')

  useEffect(() => {
    let onOpen: PluginListenerHandle | undefined
    USB.addListener('open', a => {
      sett(a.value + '---' + Date.now())
    })
      .then(listener => {
        onOpen = listener
      })
      .catch(console.log)

    return () => {
      onOpen?.remove()
    }
  }, [])

  useEffect(() => {
    let onData: PluginListenerHandle | undefined
    USB.addListener('data', a => {
      sett(a.data.toString())
    })
      .then(listener => {
        onData = listener
      })
      .catch(console.log)

    return () => {
      onData?.remove()
    }
  }, [])

  return (
    <div>
      <IonButton onClick={handleClick}>打开</IonButton>
      <div>{val ? val.value : 'null'}</div>
      <IonButton onClick={handleStart}>开始</IonButton>
      <IonButton onClick={handleStop}>停止</IonButton>
      <div>{t}</div>
    </div>
  )
}
