import { useEffect, useRef } from 'react'
import cs from './Dong.module.css'
import useEitContext from '../../hooks/useEitContext'
import eit from '../../lib/eit'

const scale = 5

const drawLine = (ctx: CanvasRenderingContext2D) => {
  const line = ctx.createLinearGradient(0, 0, 0, 64)
  line.addColorStop(0, 'rgba(255, 0, 0, 1)')
  line.addColorStop(1, 'rgba(0, 128, 255, 1)')
  ctx.fillStyle = line
  ctx.fillRect(68, 0, 2, 64)
}

export function Dong() {
  const ref = useRef<HTMLCanvasElement>(null)
  const ctx = useRef<CanvasRenderingContext2D>(null)

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
    if (msg) {
      const oc = new OffscreenCanvas(64, 64)
      oc.getContext('2d')!.putImageData(new ImageData(msg.dong, 64, 64), 0, 0)
      ctx.current?.drawImage(oc, 0, 0)
    } else {
      ctx.current?.clearRect(0, 0, 64, 64)
    }
  }, [msg])

  useEffect(() => {
    const onSaveData = (e: CustomEvent) => {
      if (!ref.current) return
      const url = ref.current.toDataURL()
      const data = url.substring(url.indexOf(',') + 1)
      e.detail({ name: 'dong.png', data })
    }
    eit.addEventListener('saveData', onSaveData as EventListener)
    return () => {
      eit.removeEventListener('saveData', onSaveData as EventListener)
    }
  }, [])

  return <canvas className={cs.c} ref={ref} width={70 * scale} height={64 * scale}></canvas>
}

export default function DongPage() {
  return (
    <div className={cs.a}>
      <Dong />
    </div>
  )
}
