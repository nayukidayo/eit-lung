import { useEffect, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import ROI from './Roi'
import cs from './Dian.module.css'

type ValType = {
  value: number
}

export function Dian() {
  const [val, setVal] = useState<ValType[]>([])

  useEffect(() => {
    const arr = Array.from({ length: 28 }).map(() => ({
      value: Math.floor(Math.random() * 100),
    }))
    setVal(arr)
  }, [])

  return (
    <div className={cs.c}>
      <div className={cs.b}>
        <div>Total</div>
        <ResponsiveContainer>
          <AreaChart data={val}>
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className={cs.b}>
        <div>ROI1</div>
        <ResponsiveContainer>
          <AreaChart data={val}>
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className={cs.b}>
        <div>ROI2</div>
        <ResponsiveContainer>
          <AreaChart data={val}>
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className={cs.b}>
        <div>ROI3</div>
        <ResponsiveContainer>
          <AreaChart data={val}>
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className={cs.b}>
        <div>ROI4</div>
        <ResponsiveContainer>
          <AreaChart data={val}>
            <Area
              isAnimationActive={false}
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default function DianPage() {
  return (
    <div className={cs.a}>
      <Dian />
      <ROI />
    </div>
  )
}
