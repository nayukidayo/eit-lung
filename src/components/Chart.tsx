import { useEffect, useLayoutEffect, useRef } from 'react'
import uPlot, { type AlignedData, Options } from 'uplot'

export type Opts = Omit<Options, 'width' | 'height'>

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
      ...opts,
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
