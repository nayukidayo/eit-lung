import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react'
import useStore from '../hooks/useStore'

export default function Setting() {
  const { store, setStore } = useStore()

  return (
    <main>
      <IonList inset>
        <IonItem>
          <IonSelect
            label="激励频率"
            value={store.jl}
            onIonChange={e => setStore({ jl: e.detail.value })}
          >
            <IonSelectOption value="4">10K</IonSelectOption>
            <IonSelectOption value="8">20K</IonSelectOption>
            <IonSelectOption value="10">30K</IonSelectOption>
            <IonSelectOption value="12">40K</IonSelectOption>
            <IonSelectOption value="14">50K</IonSelectOption>
            <IonSelectOption value="16">60K</IonSelectOption>
            <IonSelectOption value="18">70K</IonSelectOption>
            <IonSelectOption value="20">80K</IonSelectOption>
            <IonSelectOption value="22">90K</IonSelectOption>
            <IonSelectOption value="24">100K</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            label="测量模式"
            value={store.cl}
            onIonChange={e => setStore({ cl: e.detail.value })}
          >
            <IonSelectOption value="26,30">Obj-Amp</IonSelectOption>
            <IonSelectOption value="28,30">Obj-Phase</IonSelectOption>
            <IonSelectOption value="26,32">Ref-Amp</IonSelectOption>
            <IonSelectOption value="28,32">Ref-Phase</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            label="呼气末测量电压"
            value={store.hq}
            onIonChange={e => setStore({ hq: e.detail.value })}
          >
            <IonSelectOption value="1">呼气末标定</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            label="患者类型"
            value={store.hz}
            onIonChange={e => setStore({ hz: e.detail.value })}
          >
            <IonSelectOption value="1">婴幼儿</IonSelectOption>
            <IonSelectOption value="2">女性中瘦</IonSelectOption>
            <IonSelectOption value="3">女性偏胖</IonSelectOption>
            <IonSelectOption value="4">男性中瘦</IonSelectOption>
            <IonSelectOption value="5">男性偏胖</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            label="时间轴"
            value={store.sj}
            onIonChange={e => setStore({ sj: e.detail.value })}
          >
            <IonSelectOption value="1">1min</IonSelectOption>
            <IonSelectOption value="2">2min</IonSelectOption>
            <IonSelectOption value="3">5min</IonSelectOption>
            <IonSelectOption value="4">10min</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            label="时间刻度"
            value={store.kd}
            onIonChange={e => setStore({ kd: e.detail.value })}
          >
            <IonSelectOption value="1">1s</IonSelectOption>
            <IonSelectOption value="2">5s</IonSelectOption>
            <IonSelectOption value="3">10s</IonSelectOption>
            <IonSelectOption value="4">30s</IonSelectOption>
            <IonSelectOption value="5">60s</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            label="滤波设置"
            value={store.lb}
            onIonChange={e => setStore({ lb: e.detail.value })}
          >
            <IonSelectOption value="1">无滤波器</IonSelectOption>
            <IonSelectOption value="2">低通滤波</IonSelectOption>
            <IonSelectOption value="3">平滑滤波</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonSelect
            label="ROI设置"
            value={store.ro}
            onIonChange={e => setStore({ ro: e.detail.value })}
          >
            <IonSelectOption value="1">象限</IonSelectOption>
            <IonSelectOption value="2">多层</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>
    </main>
  )
}
