import { useEffect, useRef, useState } from 'react'
import Chart, { type Opts } from './Chart'
import type { AlignedData } from 'uplot'
// import cs from './Page.module.css'

const opts: Opts = {
  scales: {
    x: {
      time: false,
      auto: false,
      range: [0, 500],
    },
  },
  axes: [{ show: false }, { show: false }],
  series: [
    {},
    {
      stroke: 'rgba(66, 133, 244, 1)',
      fill: 'rgba(66, 134, 244, 0.2)',
      points: { show: false },
    },
  ],
}
export default function Page() {
  const xData = useRef(Array.from({ length: 500 }, (_, i) => i))
  const noData = useRef<AlignedData>([[0, 1], [0, 0]]) // prettier-ignore
  const [data, setData] = useState<AlignedData>(noData.current)

  useEffect(() => {
    const interval = setInterval(() => {
      setData([
        xData.current,
        Array.from({ length: 500 }, (_, i) => Math.round(Math.random() * 100)),
      ])
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <main
      style={{
        display: 'grid',
        grid: 'repeat(2, minmax(0, 1fr)) / 1fr',
        padding: '1rem',
        gap: '1rem',
      }}
    >
      <Chart opts={opts} data={data} />
    </main>
  )
}
