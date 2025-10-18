import useEitContext from '../../hooks/useEitContext'
import cs from './Roi.module.css'

export default function Roi() {
  const msg = useEitContext()

  const roi = msg ? msg.roi : new Float64Array(6)

  return (
    <div className={cs.a}>
      <div>
        <div>呼吸速率(/min)</div>
        <div>{roi[0]}</div>
      </div>
      <div>
        <div>TV_global</div>
        <div>{roi[1]}%</div>
      </div>
      <div>
        <div>TV_ROI1</div>
        <div>{roi[2]}%</div>
      </div>
      <div>
        <div>TV_ROI2</div>
        <div>{roi[3]}%</div>
      </div>
      <div>
        <div>TV_ROI3</div>
        <div>{roi[4]}%</div>
      </div>
      <div>
        <div>TV_ROI4</div>
        <div>{roi[5]}%</div>
      </div>
    </div>
  )
}
