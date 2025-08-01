import { NavLink, To } from 'react-router'
import { IonButton } from '@ionic/react'
import useStore from '../hooks/useStore'
import cs from './Navbar.module.css'

export default function Navbar() {
  const { store } = useStore()

  return (
    <nav className={cs.a}>
      <NavButton to="/view">主菜单</NavButton>
      <NavButton to="/gn" disabled>
        功能性图像
      </NavButton>
      <NavButton to="/zb">指标</NavButton>
      <NavButton to="/jz">校准</NavButton>
      <NavButton to="/hz" disabled={store.start}>
        患者
      </NavButton>
      <NavButton to="/xt" disabled={store.start}>
        系统设置
      </NavButton>
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
