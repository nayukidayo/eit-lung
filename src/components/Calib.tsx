import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, YAxis } from 'recharts'
import useStore from '../hooks/useStore'
import cs from './Calib.module.css'

export default function Calibration() {
  const { store } = useStore()

  const val = useMemo(() => {
    if (store.uell.length === 0) return [{ value: 0 }]
    return store.uell.map(value => ({ value }))
  }, [store.uell])

  return (
    <main className={cs.a}>
      <img src="/jz.png" alt="Calibration" />
      <ResponsiveContainer>
        <BarChart data={val}>
          <CartesianGrid strokeDasharray="4" vertical={false} />
          <YAxis />
          <Bar isAnimationActive={false} dataKey="value" fill="#1a65eb" />
        </BarChart>
      </ResponsiveContainer>
    </main>
  )
}
