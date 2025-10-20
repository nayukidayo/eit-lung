import { NavLink, To } from 'react-router'
import { IonButton } from '@ionic/react'
import cs from './Navbar.module.css'
import useStoreContext from '../hooks/useStoreContext'

export default function Navbar() {
  const { store } = useStoreContext()

  const disabled = store.start || store.play

  return (
    <nav className={cs.a}>
      <NavButton to="/main">主菜单</NavButton>
      {/* <NavButton to="/func" disabled>
        功能性图像
      </NavButton>
      <NavButton to="/level" disabled>
        指标
      </NavButton> */}
      <NavButton to="/adjust">校准</NavButton>
      <NavButton to="/patient" disabled={disabled}>
        患者
      </NavButton>
      <NavButton to="/setting" disabled={disabled}>
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
