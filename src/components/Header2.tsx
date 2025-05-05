import { useRef } from 'react'
import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
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

  const { store, setStore } = useStore()

  const onLbsz = (e: CustomEvent<OverlayEventDetail>) => {
    if (e.detail.role === 'ok') {
      setStore({ lb: e.detail.data.values })
    } else {
      setStore({})
    }
  }

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
      <IonButton id="lbsz">无滤波器</IonButton>
      <IonButton id="hzsz">患者</IonButton>
      <Time />

      <IonModal ref={xtzt} trigger="xtzt">
        <IonHeader>
          <IonToolbar>
            <IonTitle>系统状态</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => xtzt.current?.dismiss()}>cancel</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
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
        </IonContent>
      </IonModal>

      <IonAlert
        trigger="lbsz"
        onDidDismiss={onLbsz}
        header="滤波设置"
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
            type: 'radio',
            label: '无滤波器',
            value: '1',
            checked: '1' === store.lb,
          },
          {
            type: 'radio',
            label: '低通滤波',
            value: '2',
            checked: '2' === store.lb,
          },
          {
            type: 'radio',
            label: '平滑滤波',
            value: '3',
            checked: '3' === store.lb,
          },
        ]}
      ></IonAlert>

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
