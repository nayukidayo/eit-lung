import { useState } from 'react'
import { IonItem, IonList, IonSelect, IonSelectOption } from '@ionic/react'
import cs from './Setting.module.css'

type SettingProps = {}

const Setting: React.FC<SettingProps> = ({}) => {
  const [value, setValue] = useState({
    jl: '5',
    cl: '1',
    hq: '1',
    hz: '4',
    sj: '2',
    kd: '3',
  })

  return (
    <IonList inset>
      <IonItem>
        <IonSelect
          label="激励频率"
          value={value.jl}
          onIonChange={e => setValue({ ...value, jl: e.detail.value })}
        >
          <IonSelectOption value="1">10K</IonSelectOption>
          <IonSelectOption value="2">20K</IonSelectOption>
          <IonSelectOption value="3">30K</IonSelectOption>
          <IonSelectOption value="4">40K</IonSelectOption>
          <IonSelectOption value="5">50K</IonSelectOption>
          <IonSelectOption value="6">60K</IonSelectOption>
          <IonSelectOption value="7">70K</IonSelectOption>
          <IonSelectOption value="8">80K</IonSelectOption>
          <IonSelectOption value="9">90K</IonSelectOption>
          <IonSelectOption value="10">100K</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonSelect
          label="测量模式"
          value={value.cl}
          onIonChange={e => setValue({ ...value, cl: e.detail.value })}
        >
          <IonSelectOption value="1">Obj-Amp</IonSelectOption>
          <IonSelectOption value="2">Obj-Phase</IonSelectOption>
          <IonSelectOption value="3">Ref-Amp</IonSelectOption>
          <IonSelectOption value="4">Ref-Phase</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonSelect
          label="呼气末测量电压"
          value={value.hq}
          onIonChange={e => setValue({ ...value, hq: e.detail.value })}
        >
          <IonSelectOption value="1">呼气末标定</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonSelect
          label="患者类型"
          value={value.hz}
          onIonChange={e => setValue({ ...value, hz: e.detail.value })}
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
          value={value.sj}
          onIonChange={e => setValue({ ...value, sj: e.detail.value })}
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
          value={value.kd}
          onIonChange={e => setValue({ ...value, kd: e.detail.value })}
        >
          <IonSelectOption value="1">1s</IonSelectOption>
          <IonSelectOption value="2">5s</IonSelectOption>
          <IonSelectOption value="3">10s</IonSelectOption>
          <IonSelectOption value="4">30s</IonSelectOption>
          <IonSelectOption value="5">60s</IonSelectOption>
        </IonSelect>
      </IonItem>
    </IonList>
  )
}

export default Setting
