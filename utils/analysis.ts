import type { Analysis } from '@prisma/client'

export const provideDefaults = (analysis?: Partial<Analysis> | null) => {
  return {
    subject: analysis?.subject || '-',
    mood: analysis?.mood || '-',
    summary: analysis?.summary || '-',
    color: analysis?.color || '-',
    negative: analysis?.negative || false,
  }
}
