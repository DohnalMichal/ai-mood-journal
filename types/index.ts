import { Prisma } from '@prisma/client'

const JournalEntryWithAnalysis =
  Prisma.validator<Prisma.JournalEntryDefaultArgs>()({
    include: { analysis: true },
  })

export type JournalEntry = Prisma.JournalEntryGetPayload<
  typeof JournalEntryWithAnalysis
>
