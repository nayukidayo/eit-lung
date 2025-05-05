import { NavLink, To } from 'react-router'
import { IonButton } from '@ionic/react'

type NavButtonProps = {
  children: React.ReactNode
  disabled?: boolean
  to: To
}

export default function NavButton({ children, disabled, to }: NavButtonProps) {
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
