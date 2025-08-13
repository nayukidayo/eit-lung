import { useMemo, useRef } from 'react'
import Chart, { type Opts } from './Chart'
import useStoreContext from '../hooks/useStoreContext'
import uPlot, { type AlignedData } from 'uplot'
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
  const xData = useRef(Array.from({ length: 208 }, (_, i) => i))
  const noData = useRef<AlignedData>([[0, 1], [0, 0]]) // prettier-ignore

  const { store } = useStoreContext()

  const data = useMemo<AlignedData>(() => {
    if (store.uell.length === 0) return noData.current
    return [xData.current, store.uell]
  }, [store.uell])

  return (
    <main className={cs.a}>
      <img src="/adjust.png" alt="adjust" />
      <Chart opts={opts} data={data} />
    </main>
  )
}
