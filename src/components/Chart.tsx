import { memo, useEffect, useLayoutEffect, useRef } from 'react'
import uPlot, { AlignedData, Options } from 'uplot'

export type Opts = Omit<Options, 'width' | 'height'>

type ChartProps = {
  opts: Opts
  data: AlignedData
}

function Chart({ opts, data }: ChartProps) {
  const ref = useRef<HTMLDivElement>(null)
  const uplot = useRef<uPlot>(null)

  uplot.current?.setData(data)

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

export default memo(Chart, (prev, next) => {
  return Object.is(prev.data[0], next.data[0]) && Object.is(prev.data[1], next.data[1])
})
