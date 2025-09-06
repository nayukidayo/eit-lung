import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react'
import type { IonSegmentCustomEvent, SegmentChangeEventDetail } from '@ionic/core'
import cs from './Layout.module.css'

export default function View() {
  const [seg, setSeg] = useState(location.pathname)
  const navigate = useNavigate()

  const handleChange = (e: IonSegmentCustomEvent<SegmentChangeEventDetail>) => {
    const value = (e.detail.value ?? seg) as string
    setSeg(value)
    navigate(value)
  }

  return (
    <main className={cs.a}>
      <IonSegment value={seg} onIonChange={handleChange}>
        <IonSegmentButton value="/main">
          <IonLabel>主要视图</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="/main/dong">
          <IonLabel>动态图像</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="/main/tv">
          <IonLabel>TV图像</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="/main/dian">
          <IonLabel>电导率变化</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="/main/hu" disabled>
          <IonLabel>呼气末变化</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="/main/tong" disabled>
          <IonLabel>通气变化</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="/main/san" disabled>
          <IonLabel>三维图像</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <Outlet />
    </main>
  )
}
