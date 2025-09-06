import { useMemo, useRef } from 'react'
import type { AlignedData } from 'uplot'
import Chart, { Opts } from '../Chart'
import ROI from './Roi'
import useWorkerContext from '../../hooks/useWorkerContext'
import cs from './Dian.module.css'

const opts: Opts = {
  scales: {
    x: {
      time: false,
      auto: false,
      range: [0, 499],
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

export function Dian() {
  const xAxis = useRef<number[]>(null)
  if (xAxis.current === null) {
    xAxis.current = Array.from({ length: 500 }, (_, i) => i)
  }

  const { dian } = useWorkerContext()

  const data = useMemo<Record<string, AlignedData>>(() => {
    if (!dian) return { d0: [], d1: [], d2: [], d3: [], d4: [] }
    const arr = xAxis.current!.slice(0, dian.d0.length)
    return {
      d0: [arr, dian.d0],
      d1: [arr, dian.d1],
      d2: [arr, dian.d2],
      d3: [arr, dian.d3],
      d4: [arr, dian.d4],
    }
  }, [dian])

  return (
    <div className={cs.c}>
      <div className={cs.b}>
        <div>Total</div>
        <Chart opts={opts} data={data.d0} />
      </div>
      <div className={cs.b}>
        <div>ROI1</div>
        <Chart opts={opts} data={data.d1} />
      </div>
      <div className={cs.b}>
        <div>ROI2</div>
        <Chart opts={opts} data={data.d2} />
      </div>
      <div className={cs.b}>
        <div>ROI3</div>
        <Chart opts={opts} data={data.d3} />
      </div>
      <div className={cs.b}>
        <div>ROI4</div>
        <Chart opts={opts} data={data.d4} />
      </div>
    </div>
  )
}

export default function DianPage() {
  return (
    <div className={cs.a}>
      <Dian />
      <ROI />
    </div>
  )
}
