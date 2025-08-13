import { useEffect, useRef } from 'react'
import useWorkerContext from '../../hooks/useWorkerContext'
import cs from './Dong.module.css'

const scale = 5

export function Dong() {
  const ref = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D>(null)
  const { msg } = useWorkerContext()

  useEffect(() => {
    if (ref.current === null) return
    ctx.current = ref.current.getContext('2d')!
    ctx.current.scale(scale, scale)
    drawLine()
    return () => {
      ctx.current?.reset()
    }
  }, [])

  useEffect(() => {
    if (!msg || !ctx.current) return
    const oc = new OffscreenCanvas(64, 64)
    oc.getContext('2d')!.putImageData(new ImageData(msg.dt, 64, 64), 0, 0)
    ctx.current.drawImage(oc, 0, 0)
  }, [msg])

  const drawLine = () => {
    if (ctx.current === null) return
    const line = ctx.current.createLinearGradient(0, 0, 0, 64)
    line.addColorStop(0, '#00ABEB')
    line.addColorStop(0.5, '#FFFFFF')
    line.addColorStop(1, '#26C000')
    ctx.current.fillStyle = line
    ctx.current.fillRect(68, 0, 2, 64)
    ctx.current.fillStyle = '#00ABEB'
    ctx.current.fillRect(0, 0, 64, 64)
  }

  return <canvas className={cs.c} ref={ref} width={70 * scale} height={64 * scale}></canvas>
}

export default function DongPage() {
  return (
    <div className={cs.a}>
      <Dong />
    </div>
  )
}
