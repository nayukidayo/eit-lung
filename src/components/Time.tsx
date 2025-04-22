import { useState, useEffect } from 'react'
import cs from './Time.module.css'

const Time = () => {
  const [value, setValue] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setValue(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className={cs.a}>
      <span>{formatTime(value)}</span>
      <span>{formatDate(value)}</span>
    </div>
  )
}

export default Time

function formatTime(date: Date) {
  const h = date.getHours().toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}

function formatDate(date: Date) {
  const d = date.getDate().toString().padStart(2, '0')
  const m = (date.getMonth() + 1).toString().padStart(2, '0')
  const y = date.getFullYear()
  return `${y}/${m}/${d}`
}
