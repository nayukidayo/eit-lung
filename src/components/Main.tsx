import { useEffect, useRef } from 'react'
import cs from './Main.module.css'
import { numberToColor } from '../lib/utils'
import graph from '../lib/graph'
import x from '../lib/x'
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/react'

const width = 96
const height = 64

type MainProps = {}

export default function Main({}: MainProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current === null) return
    const ctx = ref.current.getContext('2d')!

    const dpr = window.devicePixelRatio || 1
    ctx.canvas.width = width * dpr
    ctx.canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    // 创建一个线性渐变
    const gradient = ctx.createLinearGradient(0, 10, 0, height - 10)
    // 添加三个色标
    gradient.addColorStop(0, 'green')
    gradient.addColorStop(0.5, 'cyan')
    gradient.addColorStop(1, 'green')
    // 设置填充样式并绘制矩形
    ctx.fillStyle = gradient
    ctx.fillRect(height, 10, 5, height - 10 - 10)

    ctx.fillStyle = '#000'
    ctx.font = '6px sans-serif'
    // ctx.font = '8px serif'
    ctx.fillText('1', width - 26, 16)
    ctx.fillText('-3.5', width - 26, height - 10)

    const s = performance.now()
    const imageData = ctx.createImageData(64, 64)
    for (let i = 0; i < graph.length; i++) {
      imageData.data.set(numberToColor(x[i]), graph[i] * 4)
    }
    ctx.putImageData(imageData, (width - height) / 2, 10)
    console.log(performance.now() - s) // 0.3

    return () => {
      ctx.reset()
    }
  }, [])

  return (
    <div className={cs.a}>
      <IonSegment value="a">
        <IonSegmentButton value="a">
          <IonLabel>主要视图</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="b">
          <IonLabel>TV图像</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="c">
          <IonLabel>动态图像</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="d">
          <IonLabel>电导率变化</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="e">
          <IonLabel>呼气末变化</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="f">
          <IonLabel>通气变化</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="g">
          <IonLabel>三维图像</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      <div className={cs.c}>
        <canvas ref={ref}></canvas>
      </div>
    </div>
  )
}
