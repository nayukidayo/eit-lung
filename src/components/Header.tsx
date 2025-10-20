import { useRef } from 'react'
import { useLocation } from 'react-router'
import { IonButton, useIonLoading } from '@ionic/react'
import useStoreContext from '../hooks/useStoreContext'
import cs from './Header.module.css'
import eit from '../lib/eit'

export default function Header() {
  const cirsRef = useRef<HTMLInputElement>(null)
  const urefRef = useRef<HTMLInputElement>(null)
  const dataRef = useRef<HTMLInputElement>(null)

  const local = useLocation()
  const { store, setStore } = useStoreContext()
  const [openSaveLoading] = useIonLoading()

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
    openSaveLoading({ message: '保存数据...', duration: 3000 })
  }

  const loadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const ab = await file.arrayBuffer()
    setStore({ play: true })
    await eit.loadData(ab)
    setStore({ play: false })
  }

  const disabled = store.start || store.play

  return (
    <header className={cs.a}>
      <img src="/logo.png" alt="logo" />
      <IonButton onClick={() => dataRef.current?.click()} disabled={disabled}>
        {store.play ? '回放中...' : '数据回放'}
      </IonButton>
      <input
        ref={dataRef}
        type="file"
        accept=".txt"
        onChange={loadChange}
        style={{ display: 'none' }}
      />
      {local.pathname === '/main' && (
        <IonButton id="save-loading" onClick={saveClick} disabled={disabled}>
          数据保存
        </IonButton>
      )}
      <div className={cs.b}></div>
      {store.start ? (
        <IonButton onClick={stopClick} color="danger">
          停止检测
        </IonButton>
      ) : (
        <IonButton onClick={startClick} disabled={store.play}>
          开始检测
        </IonButton>
      )}
      <IonButton onClick={() => cirsRef.current?.click()} disabled={disabled}>
        导入灵敏度
      </IonButton>
      <input
        ref={cirsRef}
        type="file"
        accept=".txt"
        onChange={cirsChange}
        style={{ display: 'none' }}
      />
      <IonButton onClick={() => urefRef.current?.click()} disabled={disabled}>
        导入空场
      </IonButton>
      <input
        ref={urefRef}
        type="file"
        accept=".txt"
        onChange={urefChange}
        style={{ display: 'none' }}
      />
    </header>
  )
}
