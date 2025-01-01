import { Editor } from '@/components/editor'
import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

type Props = {
  params: Promise<{ id: string }>
}

const getEntry = async (id: string) => {
  const user = await getUserByClerkID()

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: { userId: user.id, id },
    },
    include: {
      analysis: true,
    },
  })

  return entry
}

// TODO: Add an option to change date of the entry.
const EntryPage = async ({ params }: Props) => {
  const { id } = await params
  const entry = await getEntry(id)

  if (!entry) {
    return
  }

  return (
    <div className="p-10 h-full">
      <h2 className="text-3xl font-bold mb-8">New journal entry</h2>
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
