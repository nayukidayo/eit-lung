import { IonButton } from '@ionic/react'
import { usb } from '../lib/usb'
import useStoreContext from '../hooks/useStoreContext'
import useWorkerContext from '../hooks/useWorkerContext'
import cs from './Header.module.css'

export default function Header() {
  const { store, setStore } = useStoreContext()
  const { uell, postMessage } = useWorkerContext()

  const handleStart = () => {
    setStore({ start: true })
    const [mode1, mode2] = store.mode.split(',').map(Number)
    usb.start({ mode1, mode2, freq: Number(store.freq) })
    postMessage({ opcode: 'init', roi: store.roi, filter: store.filter })
  }

  const handleStop = () => {
    setStore({ start: false })
    usb.stop()
  }

  const handleUref = () => {
    postMessage({ opcode: 'uref', uref: uell })
  }

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
      <IonButton onClick={handleUref} disabled={!store.start}>
        空场标定
      </IonButton>
      <IonButton disabled>数据保存</IonButton>
      <IonButton disabled>数据回放</IonButton>
    </header>
  )
}
