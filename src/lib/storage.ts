export type Habit = { id: string; name: string; days: string[] }

const KEY = 'daily-hub:habits'

export function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const data: unknown = JSON.parse(raw)
    return Array.isArray(data) ? (data as Habit[]) : []
  } catch {
    return []
  }
}

export function saveHabits(habits: Habit[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(habits))
  } catch {
    // Storage can be full or blocked. The app keeps working in memory.
  }
}