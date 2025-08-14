import { useEffect, useRef, useState } from 'react'
import type { AlignedData } from 'uplot'
import Chart, { Opts } from '../Chart'
import ROI from './Roi'
import cs from './Dian.module.css'

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

export function Dian() {
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
    <div className={cs.c}>
      <div className={cs.b}>
        <div>Total</div>
        <Chart opts={opts} data={data} />
      </div>
      <div className={cs.b}>
        <div>ROI1</div>
        <Chart opts={opts} data={data} />
      </div>
      <div className={cs.b}>
        <div>ROI2</div>
        <Chart opts={opts} data={data} />
      </div>
      <div className={cs.b}>
        <div>ROI3</div>
        <Chart opts={opts} data={data} />
      </div>
      <div className={cs.b}>
        <div>ROI4</div>
        <Chart opts={opts} data={data} />
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
