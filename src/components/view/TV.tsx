import { useEffect, useRef } from 'react'
import ROI from './ROI'
import useStore from '../../hooks/useStore'
import cs from './TV.module.css'

const scale = 5

export function TV() {
  const ref = useRef<HTMLCanvasElement>(null)
  const worker = useRef<Worker>(null)
  const { store } = useStore()

  useEffect(() => {
    worker.current?.postMessage({ opcode: 'uell', uell: store.uell })
  }, [store.uell])

  useEffect(() => {
    worker.current?.postMessage({ opcode: 'uref', uref: store.uref })
  }, [store.uref])

  useEffect(() => {
    if (ref.current === null) return
    const ctx = ref.current.getContext('2d')!
    ctx.scale(scale, scale)

    const line = ctx.createLinearGradient(0, 0, 0, 64)
    line.addColorStop(0, '#00ABEB')
    line.addColorStop(0.5, '#FFFFFF')
    line.addColorStop(1, '#26C000')
    ctx.fillStyle = line
    ctx.fillRect(68, 0, 2, 64)
    ctx.fillStyle = '#00ABEB'
    ctx.fillRect(0, 0, 64, 64)

    ctx.strokeStyle = '#ff0000'
    ctx.lineWidth = 1 / scale
    ctx.beginPath()
    if (store.ro === '1') {
      ctx.moveTo(0, 32)
      ctx.lineTo(64, 32)
      ctx.moveTo(32, 0)
      ctx.lineTo(32, 64)
    } else {
      ctx.moveTo(0, 16)
      ctx.lineTo(64, 16)
      ctx.moveTo(0, 32)
      ctx.lineTo(64, 32)
      ctx.moveTo(0, 48)
      ctx.lineTo(64, 48)
    }
    ctx.stroke()

    worker.current = new Worker(new URL('../../lib/b.ts', import.meta.url), { type: 'module' })
    worker.current.postMessage({ opcode: 'init', uref: store.uref, cirs: store.cirs })
    worker.current.onmessage = e => {
      const oc = new OffscreenCanvas(64, 64)
      oc.getContext('2d')?.putImageData(new ImageData(e.data, 64, 64), 0, 0)
      ctx.drawImage(oc, 0, 0)

      ctx.beginPath()
      if (store.ro === '1') {
        ctx.moveTo(0, 32)
        ctx.lineTo(64, 32)
        ctx.moveTo(32, 0)
        ctx.lineTo(32, 64)
      } else {
        ctx.moveTo(0, 16)
        ctx.lineTo(64, 16)
        ctx.moveTo(0, 32)
        ctx.lineTo(64, 32)
        ctx.moveTo(0, 48)
        ctx.lineTo(64, 48)
      }
      ctx.stroke()
    }

    return () => {
      worker.current?.terminate()
      ctx.reset()
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
