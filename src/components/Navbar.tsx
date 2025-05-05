import { IonButton } from '@ionic/react'
import NavButton from './NavButton'
import cs from './Navbar.module.css'

export default function Navbar() {
  return (
    <div className={cs.a}>
      <NavButton to="/">主菜单</NavButton>
      <IonButton>数据保存</IonButton>
      <IonButton>冻结界面</IonButton>
      <IonButton>数据回放</IonButton>
      <NavButton to="/zb" disabled>
        指标
      </NavButton>
      <NavButton to="/gn" disabled>
        功能性图像
      </NavButton>
      <IonButton>开始检测</IonButton>
      <NavButton to="/jz">校准</NavButton>
      <NavButton to="/xt">系统设置</NavButton>
    </div>
  )
}
