import { Prisma } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JournalEntryWithAnalysis =
  Prisma.validator<Prisma.JournalEntryDefaultArgs>()({
    include: { analysis: true },
  })

export type JournalEntry = Prisma.JournalEntryGetPayload<
  typeof JournalEntryWithAnalysis
>
