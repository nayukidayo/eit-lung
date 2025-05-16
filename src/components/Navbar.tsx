import { NavLink, To } from 'react-router'
import { IonButton } from '@ionic/react'
import cs from './Navbar.module.css'

export default function Navbar() {
  return (
    <nav className={cs.a}>
      <NavButton to="/view">主菜单</NavButton>
      <NavButton to="/gn" disabled>
        功能性图像
      </NavButton>
      <NavButton to="/zb" disabled>
        指标
      </NavButton>
      <NavButton to="/jz">校准</NavButton>
      <NavButton to="/hz">患者</NavButton>
      <NavButton to="/xt">系统设置</NavButton>
    </nav>
  )
}

type NavButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  to: To
}

function NavButton({ children, disabled, to }: NavButtonProps) {
  return disabled ? (
    <IonButton disabled fill="solid">
      {children}
    </IonButton>
  ) : (
    <NavLink to={to}>
      {({ isActive }) => <IonButton fill={isActive ? 'outline' : 'solid'}>{children}</IonButton>}
    </NavLink>
  )
}
