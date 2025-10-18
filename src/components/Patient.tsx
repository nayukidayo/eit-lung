import { useRef } from 'react'
import { IonAlert, IonItem, IonLabel, IonList, IonSelect, IonSelectOption } from '@ionic/react'
import type { OverlayEventDetail } from '@ionic/core'
import useStoreContext from '../hooks/useStoreContext'

export default function Patient() {
  const hz_sex = useRef<HTMLIonSelectElement>(null)

  const { store, setStore } = useStoreContext()

  const onNameDismiss = (e: CustomEvent<OverlayEventDetail>) => {
    if (e.detail.role === 'ok') {
      let { hz_name } = e.detail.data.values
      hz_name = hz_name.trim().replace(/[\\/:*?"<>|]/g, '_')
      if (!hz_name) return
      setStore({ hz_name })
    } else {
      setStore({})
    }
  }

  const onAgeDismiss = (e: CustomEvent<OverlayEventDetail>) => {
    if (e.detail.role === 'ok') {
      const { hz_age } = e.detail.data.values
      setStore({ hz_age: Number(hz_age).toFixed() })
    } else {
      setStore({})
    }
  }

  return (
    <main>
      <IonList inset>
        <IonItem button id="hz_name">
          <IonLabel>姓名</IonLabel>
          <IonLabel slot="end">{store.hz_name}</IonLabel>
        </IonItem>
        <IonItem button onClick={() => hz_sex.current?.click()}>
          <IonLabel>性别</IonLabel>
          <IonLabel slot="end">{store.hz_sex === '1' ? '男' : '女'}</IonLabel>
        </IonItem>
        <IonItem button id="hz_age">
          <IonLabel>年龄</IonLabel>
          <IonLabel slot="end">{store.hz_age}</IonLabel>
        </IonItem>
        <IonAlert
          trigger="hz_name"
          onDidDismiss={onNameDismiss}
          header="患者姓名"
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
          ]}
        ></IonAlert>
        <IonSelect
          ref={hz_sex}
          style={{ display: 'none' }}
          label="患者性别"
          value={store.hz_sex}
          onIonChange={e => setStore({ hz_sex: e.detail.value })}
        >
          <IonSelectOption value="1">男</IonSelectOption>
          <IonSelectOption value="0">女</IonSelectOption>
        </IonSelect>
        <IonAlert
          trigger="hz_age"
          onDidDismiss={onAgeDismiss}
          header="患者年龄"
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
              name: 'hz_age',
              value: store.hz_age,
              placeholder: '患者年龄',
              type: 'number',
            },
          ]}
        ></IonAlert>
      </IonList>
    </main>
  )
}
