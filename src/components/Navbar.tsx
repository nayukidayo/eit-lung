import { NavLink, To } from 'react-router'
import { IonButton } from '@ionic/react'
import useStoreContext from '../hooks/useStoreContext'
import cs from './Navbar.module.css'

export default function Navbar() {
  const { store } = useStoreContext()

  return (
    <nav className={cs.a}>
      <NavButton to="/main" disabled={store.start}>
        主菜单
      </NavButton>
      <NavButton to="/func" disabled>
        功能性图像
      </NavButton>
      <NavButton to="/level" disabled={false}>
        指标
      </NavButton>
      <NavButton to="/adjust" disabled={store.start}>
        校准
      </NavButton>
      <NavButton to="/patient" disabled={store.start}>
        患者
      </NavButton>
      <NavButton to="/setting" disabled={store.start}>
        系统设置
      </NavButton>
    </nav>
  )
}

type NavButtonProps = {
  children: React.ReactNode
  disabled: boolean
  to: To
}

function NavButton({ children, disabled, to }: NavButtonProps) {
  return (
    <NavLink to={to} className={disabled ? cs.d : ''} tabIndex={disabled ? -1 : 0}>
      {({ isActive }) => (
        <IonButton disabled={disabled} fill={isActive ? 'outline' : 'solid'}>
          {children}
        </IonButton>
      )}
    </NavLink>
  )
}
