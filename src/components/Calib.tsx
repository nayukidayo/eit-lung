import { useMemo, useRef } from 'react'
import Chart, { type Opts } from './Chart'
import useStore from '../hooks/useStore'
import uPlot, { type AlignedData } from 'uplot'
import cs from './Calib.module.css'

const opts: Opts = {
  range: [0, 208],
  series: {
    width: 0,
    fill: '#4285F4',
    points: { show: false },
    paths: uPlot.paths.bars!({ align: 1 }),
  },
}

export default function Calibration() {
  const xData = useRef(Array.from({ length: 208 }, (_, i) => i))
  const noData = useRef<AlignedData>([[0, 1], [0, 0]]) // prettier-ignore
  
  const { store } = useStore()

  const data = useMemo<AlignedData>(() => {
    if (store.uell.length === 0) return noData.current
    return [xData.current, store.uell]
  }, [store.uell])

  return (
    <main className={cs.a}>
      <img src="/jz.png" alt="Calibration" />
      <Chart opts={opts} data={data} />
    </main>
  )
}
