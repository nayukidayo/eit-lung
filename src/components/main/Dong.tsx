import { useEffect, useRef } from 'react'
import cs from './Dong.module.css'
import useEitContext from '../../hooks/useEitContext'

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
    if (!msg || !ctx.current) return
    const oc = new OffscreenCanvas(64, 64)
    oc.getContext('2d')!.putImageData(new ImageData(msg.dong, 64, 64), 0, 0)
    ctx.current.drawImage(oc, 0, 0)
  }, [msg])

  return <canvas className={cs.c} ref={ref} width={70 * scale} height={64 * scale}></canvas>
}

export default function DongPage() {
  return (
    <div className={cs.a}>
      <Dong />
    </div>
  )
}
