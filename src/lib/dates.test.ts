import { lastNDays, toDateKey } from './dates'

describe('toDateKey', () => {
  it('formats a date as YYYY-MM-DD with zero padding', () => {
    expect(toDateKey(new Date(2026, 0, 5))).toBe('2026-01-05')
  })
})

describe('lastNDays', () => {
  it('returns n days ending today, oldest first', () => {
    expect(lastNDays('2026-11-22', 3)).toEqual(['2026-11-20', '2026-11-21', '2026-11-22'])
  })

  it('crosses a month boundary', () => {
    expect(lastNDays('2026-03-02', 4)).toEqual(['2026-02-27', '2026-02-28', '2026-03-01', '2026-03-02'])
  })

  it('includes a leap day', () => {
    expect(lastNDays('2028-03-01', 2)).toEqual(['2028-02-29', '2028-03-01'])
  })
})