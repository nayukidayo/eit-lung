import { useRef } from 'react'
import { IonButton } from '@ionic/react'
import useStoreContext from '../hooks/useStoreContext'
import cs from './Header.module.css'
import eit from '../lib/eit'

export default function Header() {
  const cirsRef = useRef<HTMLInputElement>(null)
  const urefRef = useRef<HTMLInputElement>(null)
  const dataRef = useRef<HTMLInputElement>(null)

  const { store, setStore } = useStoreContext()

  const startClick = () => {
    setStore({ start: true })
    const [mode1, mode2] = store.mode.split(',').map(Number)
    eit.start(mode1, mode2, Number(store.freq)).catch(err => {
      setStore({ start: false })
      console.log(err)
    })
  }

  const stopClick = () => {
    setStore({ start: false })
    eit.stop()
  }

  const cirsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    file.arrayBuffer().then(cirs => eit.setConfig({ cirs }))
  }

  const urefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    file.arrayBuffer().then(uref => eit.setConfig({ uref }))
  }

  const saveClick = () => {
    eit.saveData(store.hz_name)
  }

  const loadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    file.arrayBuffer().then(eit.loadData)
  }

  return (
    <header className={cs.a}>
      <img src="/logo.png" alt="logo" />
      {store.start ? (
        <IonButton onClick={stopClick} color="danger">
          停止检测
        </IonButton>
      ) : (
        <IonButton onClick={startClick}>开始检测</IonButton>
      )}
      <IonButton onClick={() => cirsRef.current?.click()} disabled={store.start}>
        导入灵敏度
      </IonButton>
      <input
        ref={cirsRef}
        type="file"
        accept=".txt"
        onChange={cirsChange}
        style={{ display: 'none' }}
      />
      <IonButton onClick={() => urefRef.current?.click()} disabled={store.start}>
        导入空场
      </IonButton>
      <input
        ref={urefRef}
        type="file"
        accept=".txt"
        onChange={urefChange}
        style={{ display: 'none' }}
      />
      <IonButton onClick={saveClick} disabled={store.start}>
        数据保存
      </IonButton>
      <IonButton onClick={() => dataRef.current?.click()} disabled={store.start}>
        数据回放
      </IonButton>
      <input
        ref={dataRef}
        type="file"
        accept=".txt"
        onChange={loadChange}
        style={{ display: 'none' }}
      />
    </header>
  )
}
