export function toDateKey(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function lastNDays(today: string, n: number): string[] {
  const [year, month, day] = today.split('-').map(Number)
  return Array.from({ length: n }, (_, i) => {
    const date = new Date(Date.UTC(year, month - 1, day - (n - 1 - i)))
    return date.toISOString().slice(0, 10)
  })
}