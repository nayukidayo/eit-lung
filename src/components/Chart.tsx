import { useEffect, useLayoutEffect, useRef } from 'react'
import uPlot, { type AlignedData, Options, Series, Scale } from 'uplot'

export type Opts = {
  range: Scale.Range
  series: Series
}

type ChartProps = {
  opts: Opts
  data: AlignedData
}

export default function Chart({ opts, data }: ChartProps) {
  const ref = useRef<HTMLDivElement>(null)
  const uplot = useRef<uPlot>(null)

  useEffect(() => {
    if (!ref.current) return
    const options: Options = {
      width: ref.current.clientWidth,
      height: ref.current.clientHeight,
      cursor: { show: false },
      legend: { show: false },
      axes: [
        { show: false },
        {
          scale: 'y',
          // grid: { show: false },
          splits: (_, _idx, min: number, max: number) => {
            const incr = (max - min) / 4
            return [min, min + incr, min + incr * 2, min + incr * 3, max]
          },
        },
      ],
      scales: {
        x: {
          time: false,
          auto: false,
          range: opts.range,
        },
        y: {
          range: (_, min: number, max: number) => {
            if (min === max && min === 0) return [0, 4]
            const buf = (max - min) * 0.1
            return [min - buf, max + buf]
          },
        },
      },
      series: [{}, opts.series],
    }
    uplot.current = new uPlot(options, data, ref.current)
    return () => {
      uplot.current?.destroy()
    }
  }, [])

  useEffect(() => {
    uplot.current?.setData(data)
  }, [data])

  useLayoutEffect(() => {
    const onResize = () => {
      if (!uplot.current || !ref.current) return
      uplot.current.setSize({
        width: ref.current.clientWidth,
        height: ref.current.clientHeight,
      })
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <div ref={ref} style={{ width: '100%', height: '100%', minWidth: '0px' }}></div>
}
