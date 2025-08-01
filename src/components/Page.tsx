import { useEffect, useRef, useState } from 'react'
import useStore from '../hooks/useStore'
// import cs from './Page.module.css'

export default function Page() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current === null) return
    const ctx = ref.current.getContext('2d')!

    ctx.scale(5, 5)

    const line = ctx.createLinearGradient(0, 0, 0, 64)
    line.addColorStop(0, '#00ABEB')
    line.addColorStop(0.5, '#FFFFFF')
    line.addColorStop(1, '#26C000')
    ctx.fillStyle = line
    ctx.fillRect(68, 0, 2, 64)
    ctx.fillStyle = '#00ABEB'
    ctx.fillRect(0, 0, 64, 64)

    ctx.fillStyle = '#ff0000'
    ctx.lineWidth = 1 / 5
    ctx.beginPath()
    ctx.moveTo(0, 32)
    ctx.lineTo(64, 32)
    ctx.stroke()

    return () => {
      ctx.reset()
    }
  }, [])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <canvas
        style={{ width: '350px', height: '320px', border: '1px solid #000' }}
        // style={{ border: '1px solid #000' }}
        ref={ref}
        width={350}
        height={320}
      ></canvas>
    </div>
  )
}
