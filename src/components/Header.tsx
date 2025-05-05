import { useRef } from 'react'
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { OverlayEventDetail } from '@ionic/core/components'
import Time from './Time'
import cs from './Header.module.css'
import logo from '../assets/react.svg'
import useStore from '../hooks/useStore'

export default function Header() {
  const xtzt = useRef<HTMLIonModalElement>(null)
  const lbsz = useRef<HTMLIonSelectElement>(null)

  const { store, setStore } = useStore()

  const onHzsz = (e: CustomEvent<OverlayEventDetail>) => {
    if (e.detail.role === 'ok') {
      setStore(e.detail.data.values)
    } else {
      setStore({})
    }
  }

  return (
    <div className={cs.a}>
      <img src={logo} alt="logo" />
      <IonButton id="xtzt">系统状态</IonButton>
      <IonSelect
        ref={lbsz}
        label="滤波设置"
        value={store.lb}
        onIonChange={e => setStore({ lb: e.detail.value })}
        style={{ display: 'none' }}
      >
        <IonSelectOption value="1">无滤波器</IonSelectOption>
        <IonSelectOption value="2">低通滤波</IonSelectOption>
        <IonSelectOption value="3">平滑滤波</IonSelectOption>
      </IonSelect>
      <IonButton onClick={() => lbsz.current?.click()}>无滤波器</IonButton>
      <IonButton id="hzsz">患者</IonButton>
      <Time />
      <IonModal ref={xtzt} trigger="xtzt">
        <IonHeader>
          <IonToolbar>
            <IonTitle>系统状态</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonLabel>激励频率</IonLabel>
              <IonLabel slot="end">1</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>测量模式</IonLabel>
              <IonLabel slot="end">1</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>呼气末测量电压</IonLabel>
              <IonLabel slot="end">1</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>激励频率</IonLabel>
              <IonLabel slot="end">1</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>患者类型</IonLabel>
              <IonLabel slot="end">1</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>时间轴</IonLabel>
              <IonLabel slot="end">1</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>时间刻度</IonLabel>
              <IonLabel slot="end">1</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
        <IonFooter>
          <IonToolbar>
            <IonButtons slot="end" className="ion-margin-end">
              <IonButton color="primary" onClick={() => xtzt.current?.dismiss()}>
                ok
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonModal>
      <IonAlert
        trigger="hzsz"
        onDidDismiss={onHzsz}
        header="患者设置"
        buttons={[
          {
            text: 'cancel',
            role: 'cancel',
          },
          {
            text: 'ok',
            role: 'ok',
          },
        ]}
        inputs={[
          {
            name: 'hz_name',
            value: store.hz_name,
            placeholder: '患者姓名',
          },
          {
            name: 'hz_sex',
            value: store.hz_sex,
            placeholder: '患者性别',
          },
          {
            type: 'number',
            name: 'hz_age',
            value: store.hz_age,
            placeholder: '患者年龄',
          },
        ]}
      ></IonAlert>
    </div>
  )
}
