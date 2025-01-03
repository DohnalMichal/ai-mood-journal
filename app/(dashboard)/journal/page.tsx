import Link from 'next/link'
import { EntryCard } from '@/components/entry-card'
import { NewEntry } from '@/components/new-entry'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { Entries } from '@/components/entries'

const getEntries = async () => {
  const user = await getUserByClerkID()
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      analysis: true,
    },
  })

  return entries
}

const JournalPage = async () => {
  const entries = await getEntries()

  return (
    <>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Journal
      </h2>
      <NewEntry />
      <Entries entries={entries} />
    </>
  )
}

export default JournalPage
