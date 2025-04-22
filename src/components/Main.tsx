import { useEffect, useRef } from 'react'
import cs from './Main.module.css'

type MainProps = {}

export default function Main({}: MainProps) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current === null) return
    const ctx = ref.current.getContext('2d')!

    // const s = performance.now()
    // for (let i = 0; i < newnode.length; i += 2) {
    //   ctx.fillStyle = `rgb(${newnode[i]}, ${newnode[i + 1]}, 0)`
    //   ctx.fillRect(newnode[i], newnode[i + 1], 1, 1)
    // }
    // console.log(performance.now() - s) // 3

    const s = performance.now()
    const imageData = ctx.createImageData(64, 64)
    for (let i = 0; i < 2328; i++) {
      imageData.data[i * 4] = 255
      imageData.data[i * 4 + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)
    console.log(performance.now() - s) // 0.3

    return () => {
      ctx.reset()
    }
  }, [])

  return (
    <div className={cs.a}>
      <div className={cs.b}>
        <button>主要视图</button>
        <button>TV图像</button>
        <button>动态图像</button>
        <button>电导率变化</button>
        <button>呼气末变化</button>
        <button>通气变化</button>
        <button>三维图像</button>
      </div>
      <div className={cs.c}>
        <canvas ref={ref} width={64} height={64}></canvas>
      </div>
    </div>
  )
}

function setupCanvas(canvas: HTMLCanvasElement) {
  // Get the device pixel ratio, falling back to 1.
  const dpr = window.devicePixelRatio || 1
  // Get the size of the canvas in CSS pixels.
  const rect = canvas.getBoundingClientRect()

  console.log(dpr, rect)
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  const ctx = canvas.getContext('2d')!
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr)
  return ctx
}
