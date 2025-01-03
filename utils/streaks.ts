import { differenceInCalendarDays, startOfDay } from 'date-fns'
import type { JournalEntry } from '@prisma/client'

type Entry = JournalEntry['createdAt']

/**
 * Calculate the current streak of consecutive journal entries.
 */
export const calculateStreak = (entries: Entry[]) => {
  if (entries.length === 0) {
    return { streak: 0, isStreaking: false }
  }

  // Normalize entries.
  const sortedEntries = entries.map((entry) => startOfDay(new Date(entry)))

  const today = startOfDay(new Date())
  let streak = 0
  let isStreaking = true

  // Check if the latest entry is from today or yesterday
  const firstEntry = sortedEntries[0]
  const daysDifference = differenceInCalendarDays(today, firstEntry)

  if (daysDifference > 1) {
    // No streak if the most recent entry is older than yesterday.
    return { streak: 0, isStreaking: false }
  }

  // Calculate streak
  for (let i = 0; i < sortedEntries.length; i++) {
    const currentDate = sortedEntries[i]
    const previousDate = sortedEntries[i + 1]

    if (i === 0) {
      // Increment streak for today or yesterday
      streak++
    } else if (previousDate) {
      const diffInDays = differenceInCalendarDays(currentDate, previousDate)

      if (diffInDays === 1) {
        streak++
      } else if (diffInDays > 1) {
        // Break streak on a gap longer than 1 day
        isStreaking = false
        break
      }
    }
  }

  return { streak, isStreaking }
}
