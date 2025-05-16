import { useEffect, useState } from 'react'
import { IonButton } from '@ionic/react'
// import cs from './Page.module.css'
import ipc from '../lib/ipc'

export default function Page() {
  const handleClick = async () => {
    const sum = await ipc.request('qwe', ['1, 2'])
    console.log(sum)
    // const ab = new Int16Array([1, 2, 3])
    // const s = await ipc.req<number>('qwe', [ab], [ab.buffer])
    // console.log(ab[0])
    // console.log(s)
  }

  return (
    <div>
      <IonButton onClick={handleClick}>打开</IonButton>
    </div>
  )
}
