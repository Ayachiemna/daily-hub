import { loadHabits, saveHabits } from './storage'

beforeEach(() => localStorage.clear())

describe('storage', () => {
  it('HAB-07: returns an empty list when nothing is saved', () => {
    expect(loadHabits()).toEqual([])
  })

  it('HAB-07: saves and loads habits without losing data', () => {
    const habits = [{ id: 'a', name: 'Read', days: ['2026-11-22'] }]
    saveHabits(habits)
    expect(loadHabits()).toEqual(habits)
  })

  it('HAB-07: returns an empty list when saved data is not valid JSON', () => {
    localStorage.setItem('daily-hub:habits', '{not json')
    expect(loadHabits()).toEqual([])
  })

  it('HAB-07: returns an empty list when saved data has the wrong shape', () => {
    localStorage.setItem('daily-hub:habits', '{"oops": true}')
    expect(loadHabits()).toEqual([])
  })
})