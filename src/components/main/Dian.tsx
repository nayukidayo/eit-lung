import { useMemo, useRef } from 'react'
import type { AlignedData } from 'uplot'
import Chart, { Opts } from '../Chart'
import ROI from './Roi'
import cs from './Dian.module.css'
import useEitContext from '../../hooks/useEitContext'

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

  const msg = useEitContext()

  const data = useMemo<AlignedData[]>(() => {
    if (!msg) return Array<AlignedData>(5).fill([])
    const arr = xAxis.current!.slice(0, msg.dian[0].length)
    return [
      [arr, msg.dian[0]],
      [arr, msg.dian[1]],
      [arr, msg.dian[2]],
      [arr, msg.dian[3]],
      [arr, msg.dian[4]],
    ]
  }, [msg])

  return (
    <div className={cs.c}>
      <div className={cs.b}>
        <div>Total</div>
        <Chart opts={opts} data={data[0]} />
      </div>
      <div className={cs.b}>
        <div>ROI1</div>
        <Chart opts={opts} data={data[1]} />
      </div>
      <div className={cs.b}>
        <div>ROI2</div>
        <Chart opts={opts} data={data[2]} />
      </div>
      <div className={cs.b}>
        <div>ROI3</div>
        <Chart opts={opts} data={data[3]} />
      </div>
      <div className={cs.b}>
        <div>ROI4</div>
        <Chart opts={opts} data={data[4]} />
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
