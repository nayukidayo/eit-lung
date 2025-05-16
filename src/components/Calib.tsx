import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import cs from './Calib.module.css'

type ValType = {
  value: number
}

export default function Calibration() {
  const [val, setVal] = useState<ValType[]>([])

  useEffect(() => {
    const arr = Array.from({ length: 208 }).map(() => ({
      value: Math.floor(Math.random() * 100),
    }))
    setVal(arr)
  }, [])

  return (
    <main className={cs.a}>
      <img src="/jz.png" alt="Calibration" />
      <ResponsiveContainer>
        <BarChart data={val}>
          <CartesianGrid strokeDasharray="4" vertical={false} />
          <XAxis />
          <YAxis />
          <Bar isAnimationActive={false} dataKey="value" fill="#1a65eb" />
        </BarChart>
      </ResponsiveContainer>
    </main>
  )
}
