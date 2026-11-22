import { calculateStreak } from './streak'

describe('calculateStreak', () => {
  it('HAB-02: returns 0 when there are no completed days', () => {
    expect(calculateStreak([], '2026-11-22')).toBe(0)
  })

  it('HAB-02: returns 1 when only today is done', () => {
    expect(calculateStreak(['2026-11-22'], '2026-11-22')).toBe(1)
  })

  it('HAB-02: counts consecutive days ending today', () => {
    const days = ['2026-11-20', '2026-11-21', '2026-11-22']
    expect(calculateStreak(days, '2026-11-22')).toBe(3)
  })

  it('HAB-03: keeps the streak alive when today is not done yet', () => {
    const days = ['2026-11-20', '2026-11-21']
    expect(calculateStreak(days, '2026-11-22')).toBe(2)
  })

  it('HAB-04: resets to 0 when yesterday and today are both missed', () => {
    expect(calculateStreak(['2026-11-20'], '2026-11-22')).toBe(0)
  })

  it('HAB-04: stops counting at the first gap', () => {
    const days = ['2026-11-18', '2026-11-21', '2026-11-22']
    expect(calculateStreak(days, '2026-11-22')).toBe(2)
  })

  it('ignores duplicate dates', () => {
    const days = ['2026-11-22', '2026-11-22', '2026-11-21']
    expect(calculateStreak(days, '2026-11-22')).toBe(2)
  })

  it('works when dates are not in order', () => {
    const days = ['2026-11-22', '2026-11-20', '2026-11-21']
    expect(calculateStreak(days, '2026-11-22')).toBe(3)
  })

    it('HAB-05: counts across a month boundary', () => {
    expect(calculateStreak(['2026-02-28', '2026-03-01'], '2026-03-01')).toBe(2)
  })

  it('HAB-05: counts across a year boundary', () => {
    expect(calculateStreak(['2026-12-31', '2027-01-01'], '2027-01-01')).toBe(2)
  })

  it('HAB-05: counts across a leap day', () => {
    const days = ['2028-02-28', '2028-02-29', '2028-03-01']
    expect(calculateStreak(days, '2028-03-01')).toBe(3)
  })
})