import HistoryChart from '@/components/HistoryChart'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

const getData = async () => {
  const user = await getUserByClerkID()
  const analyses = await prisma.analysis.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  return analyses
}

const History = async () => {
  const analyses = await getData()

  return (
    <div className="h-full">
      <div className="h-full">
        <HistoryChart data={analyses} />
      </div>
    </div>
  )
}

export default History
