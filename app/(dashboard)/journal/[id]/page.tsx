import { Editor } from '@/components/editor'
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
    <div className="h-full p-10">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {entry.analysis?.subject || 'New Journal Entry'}
      </h2>
      <Editor entry={entry} />
    </div>
  )
}

export default EntryPage
