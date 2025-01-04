import { differenceInCalendarDays, startOfDay } from 'date-fns'
import { FALLBACK_VALUE, NEUTRAL_COLOR } from '@/constants/ai'
import type { Analysis } from '@prisma/client'
import type { JournalEntry } from '@/types'

export const provideDefaults = (analysis?: Partial<Analysis> | null) => {
  return {
    subject: analysis?.subject || FALLBACK_VALUE,
    mood: analysis?.mood || FALLBACK_VALUE,
    summary: analysis?.summary || FALLBACK_VALUE,
    color: analysis?.color || NEUTRAL_COLOR,
    negative: analysis?.negative || false,
    sentimentScore: analysis?.sentimentScore || 0,
  }
}

export const calculateAverageSentiment = (entries: JournalEntry[]) => {
  if (entries.length === 0) {
    return 0
  }

  const today = startOfDay(new Date())
  const last7DaysEntries = entries.filter((entry) => {
    const entryDate = startOfDay(new Date(entry.createdAt))
    const daysDifference = differenceInCalendarDays(today, entryDate)

    return daysDifference <= 7
  })

  if (last7DaysEntries.length === 0) {
    return 0
  }

  return Math.round(
    last7DaysEntries.reduce(
      (all, current) => all + (current.analysis?.sentimentScore || 0),
      0,
    ) / last7DaysEntries.length,
  )
}
