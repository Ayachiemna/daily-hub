# Requirements

## Habits

| ID | Requirement | Acceptance criteria |
|----|-------------|---------------------|
| HAB-01 | A user can mark a habit as done for a day | Given a habit, when I tap a day, then that day is marked done. Tapping again unmarks it. |
| HAB-02 | The app shows the current streak for each habit | The streak is the number of consecutive days done, counting back from today. |
| HAB-03 | A streak stays alive until the end of today | If today is not done yet but yesterday is, the streak still counts. |
| HAB-04 | A missed day resets the streak | If neither today nor yesterday is done, the streak is 0. |
| HAB-05 | Streaks are correct across month, year and leap-day boundaries | 28 Feb to 1 Mar and 31 Dec to 1 Jan count as consecutive days. |

## Out of scope (for now)
- User accounts and cloud sync
- Habits with weekly targets 

| HAB-06 | A user can add a habit by name | Given a name, when I submit the form, then the habit appears in the list and the input clears. A blank name adds nothing. |
| HAB-07 | Habits are saved on the device | After closing and reopening the app, my habits and checked days are still there. If saved data is corrupted, the app starts empty and does not crash. |
| HAB-08 | A user can delete a habit | When I delete a habit, it disappears from the list. |