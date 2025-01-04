import { FALLBACK_VALUE, NEUTRAL_COLOR } from '@/constants/ai'
import type { Analysis } from '@prisma/client'

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
