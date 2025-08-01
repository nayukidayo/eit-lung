import { useEffect, useRef } from 'react'
import { IonButton } from '@ionic/react'
import type { PluginListenerHandle } from '@capacitor/core'
import { usb } from '../lib/usb'
import useStore from '../hooks/useStore'
import cs from './Header.module.css'

export default function Header() {
  const listener = useRef<PluginListenerHandle>(null)
  const { store, setStore } = useStore()

  const handleStart = () => {
    setStore({ start: true })
    const [mode1, mode2] = store.cl.split(',').map(Number)
    usb.start({ mode1, mode2, freq: Number(store.jl) })
  }

  const handleStop = () => {
    setStore({ start: false })
    usb.stop()
  }

  useEffect(() => {
    usb
      .addListener('data', e => {
        setStore({ uell: e.data })
      })
      .then(cb => {
        listener.current = cb
      })
    return () => {
      listener.current?.remove()
    }
  })

  return (
    <header className={cs.a}>
      <img src="/logo.png" alt="logo" />
      {store.start ? (
        <IonButton onClick={handleStop} color="danger">
          停止检测
        </IonButton>
      ) : (
        <IonButton onClick={handleStart}>开始检测</IonButton>
      )}
      <IonButton onClick={() => setStore({ uref: store.uell })} disabled={!store.start}>
        空场标定
      </IonButton>
      <IonButton disabled>数据保存</IonButton>
      <IonButton disabled>数据回放</IonButton>
    </header>
  )
}
