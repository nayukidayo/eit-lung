import { useRef } from 'react'
import uPlot, { AlignedData } from 'uplot'
import Chart, { Opts } from './Chart'
import cs from './Adjust.module.css'
import useEitContext from '../hooks/useEitContext'
import { toFixed } from '../lib/utils'

const opts: Opts = {
  scales: {
    x: {
      time: false,
      auto: false,
      range: [0, 208],
    },
    y: {
      range: (_, min: number, max: number) => {
        if (min === null) return [0, 4]
        const buf = (max - min) * 0.1
        return [min - buf, max + buf]
      },
    },
  },
  axes: [
    { show: false },
    {
      splits: (_, _idx, min: number, max: number) => {
        const incr = (max - min) / 4
        const arr = [min, min + incr, min + incr * 2, min + incr * 3, max]
        return arr.map(v => toFixed(v))
      },
    },
  ],
  series: [
    {},
    {
      width: 0,
      fill: '#4285F4',
      points: { show: false },
      paths: uPlot.paths.bars!({ align: 1 }),
    },
  ],
}

export default function Adjust() {
  const xAxis = useRef<number[]>(null)
  if (xAxis.current === null) {
    xAxis.current = Array(208).fill(0).map((_, i) => i) // prettier-ignore
  }

  const msg = useEitContext()

  const data: AlignedData = msg ? [xAxis.current!, msg.uell] : []

  return (
    <main className={cs.a}>
      <img src="/adjust.png" alt="adjust" />
      <Chart opts={opts} data={data} />
    </main>
  )
}
