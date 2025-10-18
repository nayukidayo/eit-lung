import { useEffect, useRef, useState } from 'react'
import type { AlignedData } from 'uplot'
import Chart, { Opts } from './Chart'
import { toFixed } from '../lib/utils'

const opts1: Opts = {
  legend: { show: true, live: false },
  axes: [
    {
      gap: 0,
      size: 10,
      values: (_u, splits) => splits.map(() => null),
    },
    {
      splits: (_u, _idx, min, max) => {
        const incr = (max - min) / 4
        const arr = [min, min + incr, min + incr * 2, min + incr * 3, max]
        return arr.map(v => toFixed(v))
      },
    },
  ],
  series: [
    {},
    {
      label: 'Low',
      stroke: 'rgba(66, 133, 244, 1)',
      fill: 'rgba(66, 134, 244, 0.2)',
      points: { show: false },
    },
  ],
}

const opts2: Opts = {
  legend: { show: true, live: false },
  axes: [
    {
      size: 30,
      values: '{mm}:{ss}',
    },
    {
      splits: (_u, _idx, min, max) => {
        const incr = (max - min) / 4
        const arr = [min, min + incr, min + incr * 2, min + incr * 3, max]
        return arr.map(v => toFixed(v))
      },
    },
  ],
  series: [
    {},
    {
      label: 'Roi1',
      stroke: 'rgba(66, 133, 244, 1)',
      fill: 'rgba(66, 134, 244, 0.2)',
      points: { show: false },
    },
  ],
}

export default function Level() {
  const [x, setX] = useState<number[]>([])
  const [y, setY] = useState<number[]>([])

  useEffect(() => {
    const ticker = window.setInterval(() => {
      setX(x => [...x, Math.trunc(Date.now() / 1000)])
      setY(y => [...y, Math.random() * 10])
    }, 1e3)
    return () => {
      clearTimeout(ticker)
    }
  }, [])

  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref1.current || !ref2.current) return
    const legend = ref1.current.querySelector<HTMLElement>('.u-legend')!
    const tbody = ref2.current.querySelector<HTMLElement>('.u-legend tbody')!
    const tr = legend.firstChild!.firstChild
    if (!tr) return
    tbody.insertBefore(tr, tbody.firstChild)
    legend.style.display = 'none'
  }, [])

  const data: AlignedData = [x, y]

  return (
    <div style={{ height: '100%' }}>
      <div ref={ref1} style={{ height: 200 }}>
        <Chart opts={opts1} data={data} />
      </div>
      <div ref={ref2} style={{ height: 200 }}>
        <Chart opts={opts2} data={data} />
      </div>
    </div>
  )
}

// data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAADCAIAAAA/Y+msAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKElEQVQImT3BwQGAMACEMLjOoUO7MP2Z+D3v2iFhsFyliIKgbWci8btHMwjpy3ZBbgAAAABJRU5ErkJggg==

// await Filesystem.mkdir({
//   path: 'EIT_LUNG/张三/20251014131034',
//   directory: Directory.Documents,
//   recursive: true,
// })

// let result = await Filesystem.writeFile({
//   path: 'EIT/张三_20251014131034/test.txt',
//   data: 'Hello World!',
//   directory: Directory.Documents,
//   encoding: Encoding.UTF8,
// })

// result = await Filesystem.writeFile({
//   path: 'EIT/张三_20251014131034/test.png',
//   data: 'iVBORw0KGgoAAAANSUhEUgAAAAYAAAADCAIAAAA/Y+msAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAKElEQVQImT3BwQGAMACEMLjOoUO7MP2Z+D3v2iFhsFyliIKgbWci8btHMwjpy3ZBbgAAAABJRU5ErkJggg==',
//   directory: Directory.Documents,
// })
