import { IonButton } from '@ionic/react'
import { NavLink, Outlet } from 'react-router'
import cs from './Layout.module.css'
import logo from '../assets/react.svg'
import Time from './Time'

export default function Layout() {
  return (
    <div className={cs.a}>
      <div className={cs.h}>
        <img src={logo} alt="logo" />
        <IonButton>系统状态</IonButton>
        <IonButton>滤波设置</IonButton>
        <IonButton>患者</IonButton>
        <Time />
      </div>
      <div className={cs.n}>
        <NavLink to="/">
          {({ isActive }) => <IonButton fill={isActive ? 'outline' : 'solid'}>主菜单</IonButton>}
        </NavLink>
        <IonButton>数据保存</IonButton>
        <IonButton>冻结界面</IonButton>
        <IonButton>数据回放</IonButton>
        <NavLink to="/zb">
          {({ isActive }) => <IonButton fill={isActive ? 'outline' : 'solid'}>指标</IonButton>}
        </NavLink>
        <NavLink to="/gn">
          {({ isActive }) => (
            <IonButton fill={isActive ? 'outline' : 'solid'}>功能性图像</IonButton>
          )}
        </NavLink>
        <IonButton>开始检测</IonButton>
        <NavLink to="/jz">
          {({ isActive }) => <IonButton fill={isActive ? 'outline' : 'solid'}>校准</IonButton>}
        </NavLink>
        <NavLink to="/xt">
          {({ isActive }) => <IonButton fill={isActive ? 'outline' : 'solid'}>系统设置</IonButton>}
        </NavLink>
      </div>
      <div className={cs.m}>
        <Outlet />
      </div>
    </div>
  )
}
