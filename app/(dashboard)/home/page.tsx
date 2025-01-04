import { Trophy } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { BentoGrid } from '@/components/ui/bento-grid'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { calculateStreak } from '@/utils/streaks'
import { Gauge } from '@/components/gauge'
import { calculateAverageSentiment } from '@/utils/analysis'

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

const HomePage = async () => {
  const entries = await getEntries()

  const { streak } = calculateStreak(entries.map((entry) => entry.createdAt))
  const average = calculateAverageSentiment(entries)

  return (
    <div>
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Home
      </h2>

      <BentoGrid className="mx-auto mt-10 max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>You current streak</CardTitle>
            <CardDescription>
              You have been journaling for <strong>{streak}</strong> days in a
              row
            </CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <Trophy size={48} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average sentiment</CardTitle>
            <CardDescription>
              Average sentiment for the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <Gauge value={average} />
            <span className="text-lg font-semibold">{average}</span>
          </CardContent>
        </Card>
      </BentoGrid>
    </div>
  )
}

export default HomePage
