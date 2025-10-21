import { useEffect, useRef } from 'react'
import ROI from './Roi'
import cs from './TV.module.css'
import useStoreContext from '../../hooks/useStoreContext'
import useEitContext from '../../hooks/useEitContext'
import eit from '../../lib/eit'
import { Roi } from '../../lib/types'

const scale = 5

const drawLine = (ctx: CanvasRenderingContext2D) => {
  const line = ctx.createLinearGradient(0, 0, 0, 64)
  line.addColorStop(0, 'rgba(255, 0, 0, 1)')
  line.addColorStop(1, 'rgba(0, 128, 255, 1)')
  ctx.fillStyle = line
  ctx.fillRect(68, 0, 2, 64)
}

const drawRoi = (ctx: CanvasRenderingContext2D, roi: Roi) => {
  ctx.strokeStyle = 'rgba(66, 244, 81, 1)'
  ctx.lineWidth = 1 / scale
  ctx.beginPath()
  if (roi === 'dc') {
    ctx.moveTo(0, 16)
    ctx.lineTo(64, 16)
    ctx.moveTo(0, 32)
    ctx.lineTo(64, 32)
    ctx.moveTo(0, 48)
    ctx.lineTo(64, 48)
  } else {
    ctx.moveTo(0, 32)
    ctx.lineTo(64, 32)
    ctx.moveTo(32, 0)
    ctx.lineTo(32, 64)
  }
  ctx.stroke()
}

export function TV() {
  const ref = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D>(null)

  const { store } = useStoreContext()
  const msg = useEitContext()

  useEffect(() => {
    if (!ref.current) return
    ctx.current = ref.current.getContext('2d')!
    ctx.current.scale(scale, scale)
    drawLine(ctx.current)
    return () => {
      ctx.current?.reset()
    }
  }, [])

  useEffect(() => {
    if (msg || !ctx.current) return
    ctx.current.clearRect(0, 0, 64, 64)
    drawRoi(ctx.current, store.roi)
  }, [msg, store.roi])

  useEffect(() => {
    if (!msg?.tv || !ctx.current) return
    const oc = new OffscreenCanvas(64, 64)
    oc.getContext('2d')!.putImageData(new ImageData(msg.tv, 64, 64), 0, 0)
    ctx.current.drawImage(oc, 0, 0)
    drawRoi(ctx.current, store.roi)
  }, [msg?.tv, store.roi])

  useEffect(() => {
    const onSaveData = (e: CustomEvent) => {
      if (!ref.current) return
      const url = ref.current.toDataURL()
      const data = url.substring(url.indexOf(',') + 1)
      e.detail({ name: 'tv.png', data })
    }
    eit.addEventListener('saveData', onSaveData as EventListener)
    return () => {
      eit.removeEventListener('saveData', onSaveData as EventListener)
    }
  }, [])

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
