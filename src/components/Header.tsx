import { IonButton } from '@ionic/react'
import cs from './Header.module.css'

export default function Header() {
  const handleStart = () => {}

  return (
    <header className={cs.a}>
      <img src="/logo.png" alt="logo" />
      {/* <IonButton>暂停检测</IonButton> */}
      {/* <IonButton>停止检测</IonButton> */}
      <IonButton onClick={handleStart}>开始检测</IonButton>
      <IonButton>空场标定</IonButton>
      <IonButton>数据保存</IonButton>
      <IonButton>数据回放</IonButton>
    </header>
  )
}
