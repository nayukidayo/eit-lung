import { useEffect, useRef } from 'react'
import type { AlignedData } from 'uplot'
import Chart, { Opts } from '../Chart'
import ROI from './Roi'
import cs from './Dian.module.css'
import useEitContext from '../../hooks/useEitContext'
import { toFixed } from '../../lib/utils'
import eit from '../../lib/eit'

const TotalOpts: Opts = {
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
      label: 'Total',
      stroke: 'rgba(66, 133, 244, 1)',
      fill: 'rgba(66, 134, 244, 0.2)',
      points: { show: false },
    },
  ],
}

const RoiOpts: Opts = {
  legend: { show: true, live: false },
  axes: [
    {
      size: 30,
      values: '{mm}:{ss}',
      // values: '{ss}.{fff}',
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
      stroke: 'rgba(56, 244, 235, 1)',
      // fill: 'rgba(56, 244, 235, 0.2)',
      points: { show: false },
    },
    {
      label: 'Roi2',
      stroke: 'rgba(66, 244, 81, 1)',
      // fill: 'rgba(66, 244, 81, 0.2)',
      points: { show: false },
    },
    {
      label: 'Roi3',
      stroke: 'rgba(244, 66, 244, 1)',
      // fill: 'rgba(244, 66, 244, 0.2)',
      points: { show: false },
    },
    {
      label: 'Roi4',
      stroke: 'rgba(244, 93, 66, 1)',
      // fill: 'rgba((244, 93, 66, 0.2)',
      points: { show: false },
    },
  ],
}

export function Dian() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const legend = ref.current.firstElementChild!.querySelector<HTMLElement>('.u-legend')!
    const tbody = ref.current.lastElementChild!.querySelector<HTMLElement>('.u-legend tbody')!
    const tr = legend.firstChild!.firstChild
    if (!tr) return
    tbody.insertBefore(tr, tbody.firstChild)
    legend.style.display = 'none'
  }, [])

  useEffect(() => {
    const onSaveData = (e: CustomEvent) => {
      if (!ref.current) return
      const [a, b] = ref.current.querySelectorAll('canvas')
      if (!a || !b) return
      const oc = new OffscreenCanvas(a.width, a.height + b.height)
      const ctx = oc.getContext('2d')!
      ctx.drawImage(a, 0, 0)
      ctx.drawImage(b, 0, a.height)
      ctx.globalCompositeOperation = 'destination-over'
      ctx.fillStyle = 'rgba(255, 255, 255, 1)'
      ctx.fillRect(0, 0, oc.width, oc.height)
      oc.convertToBlob().then(blob => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          const url = reader.result as string
          const data = url.substring(url.indexOf(',') + 1)
          e.detail({ name: 'dian.png', data })
        }
      })
    }
    eit.addEventListener('saveData', onSaveData as EventListener)
    return () => {
      eit.removeEventListener('saveData', onSaveData as EventListener)
    }
  }, [])

  const msg = useEitContext()

  const data: Record<string, AlignedData> = !msg
    ? { total: [], roi: [] }
    : {
        total: [msg.dian.time, msg.dian.data[0]],
        roi: [
          msg.dian.time,
          msg.dian.data[1],
          msg.dian.data[2],
          msg.dian.data[3],
          msg.dian.data[4],
        ],
      }

  return (
    <div className={cs.q} ref={ref}>
      <Chart opts={TotalOpts} data={data.total} />
      <Chart opts={RoiOpts} data={data.roi} />
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
