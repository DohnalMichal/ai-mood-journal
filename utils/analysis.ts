import type { Analysis } from '@prisma/client'

export const provideDefaults = (analysis?: Partial<Analysis> | null) => {
  return {
    subject: analysis?.subject || 'Neutral',
    mood: analysis?.mood || 'None',
    summary: analysis?.summary || 'None',
    color: analysis?.color || '#0101fe',
    negative: analysis?.negative || false,
    sentimentScore: analysis?.sentimentScore || 0,
  }
}
