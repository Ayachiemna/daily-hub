import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HabitTracker } from './HabitTracker'

const TODAY = '2026-11-22'

beforeEach(() => localStorage.clear())

async function addHabit(user: ReturnType<typeof userEvent.setup>, name: string) {
  await user.type(screen.getByLabelText('New habit'), name)
  await user.click(screen.getByRole('button', { name: 'Add habit' }))
}

describe('HabitTracker', () => {
  it('shows an empty state when there are no habits', () => {
    render(<HabitTracker today={TODAY} />)
    expect(screen.getByText(/No habits yet/)).toBeInTheDocument()
  })

  it('HAB-06: adds a habit and clears the input', async () => {
    const user = userEvent.setup()
    render(<HabitTracker today={TODAY} />)
    await addHabit(user, 'Drink water')
    expect(screen.getByText('Drink water')).toBeInTheDocument()
    expect(screen.getByLabelText('New habit')).toHaveValue('')
  })

  it('HAB-06: ignores a blank name', async () => {
    const user = userEvent.setup()
    render(<HabitTracker today={TODAY} />)
    await addHabit(user, '   ')
    expect(screen.getByText(/No habits yet/)).toBeInTheDocument()
  })

  it('HAB-01: marks a day done and unmarks it on a second tap', async () => {
    const user = userEvent.setup()
    render(<HabitTracker today={TODAY} />)
    await addHabit(user, 'Read')
    const day = screen.getByRole('button', { name: `Read on ${TODAY}` })
    expect(day).toHaveAttribute('aria-pressed', 'false')
    await user.click(day)
    expect(day).toHaveAttribute('aria-pressed', 'true')
    await user.click(day)
    expect(day).toHaveAttribute('aria-pressed', 'false')
  })

  it('HAB-02: shows the streak after checking consecutive days', async () => {
    const user = userEvent.setup()
    render(<HabitTracker today={TODAY} />)
    await addHabit(user, 'Read')
    expect(screen.getByText('0 day streak')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Read on 2026-11-21' }))
    await user.click(screen.getByRole('button', { name: 'Read on 2026-11-22' }))
    expect(screen.getByText('2 day streak')).toBeInTheDocument()
  })

  it('HAB-07: keeps habits and checked days after the app is reopened', async () => {
    const user = userEvent.setup()
    const first = render(<HabitTracker today={TODAY} />)
    await addHabit(user, 'Read')
    await user.click(screen.getByRole('button', { name: `Read on ${TODAY}` }))
    first.unmount()

    render(<HabitTracker today={TODAY} />)
    expect(screen.getByText('Read')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: `Read on ${TODAY}` })).toHaveAttribute('aria-pressed', 'true')
  })

  it('HAB-07: starts empty instead of crashing when saved data is corrupted', () => {
    localStorage.setItem('daily-hub:habits', '{not json')
    render(<HabitTracker today={TODAY} />)
    expect(screen.getByText(/No habits yet/)).toBeInTheDocument()
  })

  it('HAB-08: deletes a habit', async () => {
    const user = userEvent.setup()
    render(<HabitTracker today={TODAY} />)
    await addHabit(user, 'Read')
    await user.click(screen.getByRole('button', { name: 'Delete Read' }))
    expect(screen.queryByText('Read')).not.toBeInTheDocument()
  })
})