import { useEffect, useRef } from 'react'
import ROI from './Roi'
import useStoreContext from '../../hooks/useStoreContext'
import useWorkerContext from '../../hooks/useWorkerContext'
import cs from './TV.module.css'

const scale = 5

export function TV() {
  const ref = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D>(null)
  const { store } = useStoreContext()
  const { msg } = useWorkerContext()

  useEffect(() => {
    if (ref.current === null) return
    ctx.current = ref.current.getContext('2d')!
    ctx.current.scale(scale, scale)
    drawLine()
    drawRoi()
    return () => {
      ctx.current?.reset()
    }
  }, [])

  useEffect(() => {
    if (!msg || !ctx.current) return
    const oc = new OffscreenCanvas(64, 64)
    oc.getContext('2d')!.putImageData(new ImageData(msg.dt, 64, 64), 0, 0)
    ctx.current.drawImage(oc, 0, 0)
    drawRoi()
  }, [msg])

  const drawLine = () => {
    if (ctx.current === null) return
    const line = ctx.current.createLinearGradient(0, 0, 0, 64)
    line.addColorStop(0, '#00ABEB')
    line.addColorStop(0.5, '#26C000')
    line.addColorStop(1, '#DFEB00')
    ctx.current.fillStyle = line
    ctx.current.fillRect(68, 0, 2, 64)
    ctx.current.fillStyle = '#00ABEB'
    ctx.current.fillRect(0, 0, 64, 64)
  }

  const drawRoi = () => {
    if (ctx.current === null) return
    ctx.current.strokeStyle = '#ff0000'
    ctx.current.lineWidth = 1 / scale
    ctx.current.beginPath()
    if (store.roi === 'dc') {
      ctx.current.moveTo(0, 16)
      ctx.current.lineTo(64, 16)
      ctx.current.moveTo(0, 32)
      ctx.current.lineTo(64, 32)
      ctx.current.moveTo(0, 48)
      ctx.current.lineTo(64, 48)
    } else {
      ctx.current.moveTo(0, 32)
      ctx.current.lineTo(64, 32)
      ctx.current.moveTo(32, 0)
      ctx.current.lineTo(32, 64)
    }
    ctx.current.stroke()
  }

  return <canvas className={cs.c} ref={ref} width={70 * scale} height={64 * scale}></canvas>
}

export default function TVPage() {
  return (
    <div className={cs.a}>
      <TV />
      <ROI />
    </div>
  )
}
