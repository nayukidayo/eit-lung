import { useEffect, useLayoutEffect, useRef } from 'react'
import uPlot from 'uplot'
// import cs from './Page.module.css'

export default function Page() {
  const ref = useRef<HTMLDivElement>(null)
  const u = useRef<uPlot>(null)
  const x = useRef<number[]>(Array.from({ length: 20 }, (_, i) => i))

  useEffect(() => {
    if (!ref.current) return

    const opts: uPlot.Options = {
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
      series: [
        {},
        {
          width: 0,
          fill: '#4285F4',
          points: { show: false },
          paths: uPlot.paths.bars!({ align: 1 }),
        },
      ],
      axes: [
        { show: false },
        {
          scale: 'y',
          size: 60,
        },
      ],
      cursor: { show: false },
      legend: { show: false },
      scales: {
        x: {
          time: false,
          auto: false,
          range: [0, 20],
        },
        y: {
          // auto: false,
          // range: {
          //   min: { pad: 1 },
          //   max: { pad: 1 },
          // },
        },
      },
    }

    u.current = new uPlot(
      opts,
      [
        x.current, // X轴数据
        Array.from({ length: 20 }, (_, i) => i + 1), // Y轴数据
      ],
      ref.current
    )

    return () => {
      u.current?.destroy()
    }
  }, [])

  useLayoutEffect(() => {
    const onResize = () => {
      if (!u.current || !ref.current) return
      u.current.setSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      })
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <main
      style={{
        display: 'grid',
        grid: 'repeat(2, minmax(0, 1fr)) / 1fr',
        padding: ' 1rem 2rem 1rem 0',
        gap: '1rem',
      }}
    >
      <div ref={ref} style={{ width: '100%', height: '100%', minWidth: '0px' }}></div>
    </main>
  )
}
