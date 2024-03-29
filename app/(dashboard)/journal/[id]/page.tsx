import Editor from '@/components/Editor'
import { analyze } from '@/utils/ai'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

type Props = {
  params: { id: string }
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

const EntryPage = async ({ params }: Props) => {
  const entry = await getEntry(params.id)

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
