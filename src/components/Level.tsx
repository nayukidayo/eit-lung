import { useEffect, useRef, useState } from 'react'
import type { AlignedData } from 'uplot'
import Chart, { Opts } from './Chart'
import { toFixed } from '../lib/utils'

const opts1: Opts = {
  legend: { show: true, live: false },
  axes: [
    {},
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

export default function Level() {
  const a = useRef<AlignedData>([])
  if (a.current.length === 0) {
    const x = Array(208)
      .fill(0)
      .map((_, i) => i)
    const y = Array(208)
      .fill(0)
      .map(() => Math.random() * 10)
    a.current = [x, y]
  }

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // setTimeout(() => {
    //   if (!ref.current) return
    //   let htmlContent = ref.current.outerHTML
    //   let rect = ref.current.getBoundingClientRect()
    //   let pxRatio = devicePixelRatio
    //   let width = Math.ceil(rect.width * pxRatio)
    //   let height = Math.ceil(rect.height * pxRatio)

    //   let viewBox = `0 0 ${Math.ceil(rect.width)} ${Math.ceil(rect.height)}`
    //   let svgText = `
		// 	<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${viewBox}">
		// 		<style>
		// 			body { margin: 0; padding: 0; }
		// 		</style>
		// 		<foreignObject width="100%" height="100%">
		// 			<body xmlns="http://www.w3.org/1999/xhtml">${htmlContent}</body>
		// 		</foreignObject>
		// 	</svg>
		// `
    //   let blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' })
    //   let url = URL.createObjectURL(blob)
    //   const w = document.createElement('a')
    //   w.href = url
    //   w.download = 'chart.svg'
    //   w.click()
    //   URL.revokeObjectURL(url)
    // }, 1e3)

    return () => {}
  }, [])

  return (
    <div ref={ref} style={{ height: 400 }}>
      <Chart opts={opts1} data={a.current} />
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
