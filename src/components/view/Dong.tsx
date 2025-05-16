import { useEffect, useRef } from 'react'
import cs from './Dong.module.css'

export function Dong() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current === null) return
    const ctx = ref.current.getContext('2d')!

    ctx.beginPath()
    ctx.moveTo(74, 0)
    ctx.lineTo(74, 64)
    ctx.stroke()

    const imageData = ctx.createImageData(64, 64)
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 0] = 190 // R 值
      imageData.data[i + 1] = 0 // G 值
      imageData.data[i + 2] = 210 // B 值
      imageData.data[i + 3] = 255 // A 值
    }
    ctx.putImageData(imageData, 0, 0)

    return () => {
      ctx.reset()
    }
  }, [])

  return <canvas className={cs.c} ref={ref} width={84} height={64}></canvas>
}

export default function DongPage() {
  return (
    <div className={cs.a}>
      <Dong />
    </div>
  )
}
