const DAY_MS = 86_400_000

function toUtcMs(date: string): number {
  const [year, month, day] = date.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

function previousDay(date: string): string {
  return new Date(toUtcMs(date) - DAY_MS).toISOString().slice(0, 10)
}

export function calculateStreak(completedDates: string[], today: string): number {
  const done = new Set(completedDates)
  let cursor = done.has(today) ? today : previousDay(today)
  let streak = 0

  while (done.has(cursor)) {
    streak++
    cursor = previousDay(cursor)
  }
  return streak
}