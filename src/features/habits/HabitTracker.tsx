import { type FormEvent, useEffect, useState } from 'react'
import { lastNDays, toDateKey } from '../../lib/dates'
import { loadHabits, saveHabits, type Habit } from '../../lib/storage'
import { calculateStreak } from '../../lib/streak'

type Props = { today?: string }

export function HabitTracker({ today: todayProp }: Props) {
  const [today] = useState(() => todayProp ?? toDateKey(new Date()))
  const [habits, setHabits] = useState<Habit[]>(loadHabits)
  const [name, setName] = useState('')
  const days = lastNDays(today, 7)

  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  function addHabit(e: FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2)
    setHabits([...habits, { id, name: trimmed, days: [] }])
    setName('')
  }

  function toggleDay(id: string, day: string) {
    setHabits(
      habits.map((h) =>
        h.id !== id
          ? h
          : { ...h, days: h.days.includes(day) ? h.days.filter((d) => d !== day) : [...h.days, day] },
      ),
    )
  }

  function removeHabit(id: string) {
    setHabits(habits.filter((h) => h.id !== id))
  }

  return (
    <section>
      <form className="add-form" onSubmit={addHabit}>
        <input
          aria-label="New habit"
          placeholder="New habit, like Drink water"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
        />
        <button className="btn" type="submit">
          Add habit
        </button>
      </form>

      {habits.length === 0 ? (
        <p className="empty">No habits yet. Add one above, then tap a day to check it off.</p>
      ) : (
        <ul className="habits">
          {habits.map((h) => (
            <li className="habit" key={h.id}>
              <div className="habit-head">
                <span className="habit-name">{h.name}</span>
                <span className="streak">{`${calculateStreak(h.days, today)} day streak`}</span>
                <button className="icon-btn" aria-label={`Delete ${h.name}`} onClick={() => removeHabit(h.id)}>
                  ×
                </button>
              </div>
              <div className="days">
                {days.map((day) => (
                  <button
                    key={day}
                    className="day"
                    aria-pressed={h.days.includes(day)}
                    aria-label={`${h.name} on ${day}`}
                    onClick={() => toggleDay(h.id, day)}
                  >
                    {day.slice(8)}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}