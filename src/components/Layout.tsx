import { Outlet } from 'react-router'
import Header from './Header'
import Navbar from './Navbar'
import cs from './Layout.module.css'

export default function Layout() {
  return (
    <div className={cs.a}>
      <Header />
      <Navbar />
      <div className={cs.m}>
        <Outlet />
      </div>
    </div>
  )
}
