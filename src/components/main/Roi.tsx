import { useRef } from 'react'
import useWorkerContext from '../../hooks/useWorkerContext'
import { toFixed2 } from '../../lib/utils'
import cs from './Roi.module.css'

export default function Roi() {
  const br = useRef(0)
  const { msg } = useWorkerContext()

  if (msg?.br) {
    br.current = toFixed2(msg.br)
  }

  return (
    <div className={cs.a}>
      <div>
        <div>呼吸速率(/min)</div>
        <div>{br.current}</div>
      </div>
      <div>
        <div>TV_global</div>
        <div>100%</div>
      </div>
      <div>
        <div>TV_ROI1</div>
        <div>{toFixed2(msg?.tv1)}%</div>
      </div>
      <div>
        <div>TV_ROI2</div>
        <div>{toFixed2(msg?.tv2)}%</div>
      </div>
      <div>
        <div>TV_ROI3</div>
        <div>{toFixed2(msg?.tv3)}%</div>
      </div>
      <div>
        <div>TV_ROI4</div>
        <div>{toFixed2(msg?.tv4)}%</div>
      </div>
    </div>
  )
}
