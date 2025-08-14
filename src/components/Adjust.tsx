import { useMemo, useRef } from 'react'
import uPlot, { AlignedData } from 'uplot'
import Chart, { Opts } from './Chart'
import useWorkerContext from '../hooks/useWorkerContext'
import cs from './Adjust.module.css'

const opts: Opts = {
  scales: {
    x: {
      time: false,
      auto: false,
      range: [0, 208],
    },
    y: {
      range: (_, min: number, max: number) => {
        if (min === max && min === 0) return [0, 4]
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
        return [min, min + incr, min + incr * 2, min + incr * 3, max]
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
  const xData = useRef<number[]>(null)
  if (xData.current === null) {
    xData.current = Array.from({ length: 208 }, (_, i) => i)
  }

  const noData = useRef<AlignedData>(null)
  if (noData.current === null) {
    noData.current = [[0, 1], [0, 0]] // prettier-ignore
  }

  const { uell } = useWorkerContext()

  const data = useMemo<AlignedData>(() => {
    return uell ? [xData.current!, uell] : noData.current!
  }, [uell])

  return (
    <main className={cs.a}>
      <img src="/adjust.png" alt="adjust" />
      <Chart opts={opts} data={data} />
    </main>
  )
}
