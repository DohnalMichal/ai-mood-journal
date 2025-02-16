import { HistoryChart } from '@/components/history-chart'
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
    <div className="h-full text-foreground">
      <HistoryChart data={analyses} />
    </div>
  )
}

export default History
