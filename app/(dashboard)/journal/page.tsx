import Link from 'next/link'
import { EntryCard } from '@/components/entry-card'
import { NewEntry } from '@/components/new-entry'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

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
      <h2 className="text-3xl font-bold mb-8">Journal</h2>
      <NewEntry />
      <div className="mt-8 grid grid-cols-3 gap-4">
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </>
  )
}

export default JournalPage
