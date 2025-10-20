import { useEffect, useRef } from 'react'
import ROI from './Roi'
import cs from './TV.module.css'
import useStoreContext from '../../hooks/useStoreContext'
import useEitContext from '../../hooks/useEitContext'
import eit from '../../lib/eit'

const scale = 5

const drawLine = (ctx: CanvasRenderingContext2D) => {
  const line = ctx.createLinearGradient(0, 0, 0, 64)
  line.addColorStop(0, '#00ABEB')
  line.addColorStop(0.5, '#26C000')
  line.addColorStop(1, '#DFEB00')
  ctx.fillStyle = line
  ctx.fillRect(68, 0, 2, 64)
  // ctx.fillStyle = '#00ABEB'
  // ctx.fillRect(0, 0, 64, 64)
}

const drawRoi = (ctx: CanvasRenderingContext2D, roi: string) => {
  ctx.strokeStyle = '#ff0000'
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
    drawRoi(ctx.current, store.roi)
    return () => {
      ctx.current?.reset()
    }
  }, [])

  useEffect(() => {
    if (msg && msg.tv && ctx.current) {
      const oc = new OffscreenCanvas(64, 64)
      oc.getContext('2d')!.putImageData(new ImageData(msg.tv, 64, 64), 0, 0)
      ctx.current.drawImage(oc, 0, 0)
      drawRoi(ctx.current, store.roi)
    }
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
