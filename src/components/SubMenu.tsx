import cs from './SubMenu.module.css'

const SubMenu = () => {
  return (
    <div className={cs.a}>
      <button>主要视图</button>
      <button>TV图像</button>
      <button>动态图像</button>
      <button>电导率变化</button>
      <button>呼气末变化</button>
      <button>通气变化</button>
      <button>三维图像</button>
    </div>
  )
}

export default SubMenu
