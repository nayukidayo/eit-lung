export function toFixed(num: number, fixed = 1) {
  const pow = Math.pow(10, fixed)
  return Math.round(num * pow) / pow
}

export function formatNow() {
  const date = new Date()
  const y = date.getFullYear().toString()
  const M = (date.getMonth() + 1).toString().padStart(2, '0')
  const d = date.getDate().toString().padStart(2, '0')
  const h = date.getHours().toString().padStart(2, '0')
  const m = date.getMinutes().toString().padStart(2, '0')
  const s = date.getSeconds().toString().padStart(2, '0')
  return y + M + d + h + m + s
}
