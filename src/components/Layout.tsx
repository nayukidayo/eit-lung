import { NavLink, Outlet } from 'react-router'
import cs from './Layout.module.css'
import logo from '../assets/react.svg'
import Time from './Time'

export default function Layout() {
  return (
    <div className={cs.a}>
      <header>
        <img src={logo} alt="logo" />
        <button className="x">系统状态</button>
        <button>滤波设置</button>
        <button>患者</button>
        <Time />
      </header>
      <nav>
        <NavLink to="/">
          {({ isActive }) => (
            <button style={{ backgroundColor: isActive ? '#fff' : undefined }}>主菜单</button>
          )}
        </NavLink>
        <button>数据保存</button>
        <button>冻结界面</button>
        <button>数据回放</button>
        <button>指标</button>
        <button>功能性图像</button>
        <button>开始检测</button>
        <button>校准</button>
        <NavLink to="/setting">
          {({ isActive }) => (
            <button style={{ backgroundColor: isActive ? '#fff' : undefined }}>系统设置</button>
          )}
        </NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
