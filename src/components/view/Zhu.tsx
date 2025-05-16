import { Dong } from './Dong'
import { TV } from './TV'
import { Dian } from './Dian'
import ROI from './ROI'
import cs from './Zhu.module.css'

export default function Zhu() {
  return (
    <div className={cs.a}>
      <div className={cs.d}>
        <div className={cs.l}>动态图像</div>
        <Dong />
      </div>
      <div className={cs.t}>
        <div className={cs.l}>TV图像</div>
        <TV />
      </div>
      <div className={cs.b}>
        <div className={cs.l}>电导率变化</div>
        <Dian />
      </div>
      <div className={cs.r}>
        <ROI />
      </div>
    </div>
  )
}
