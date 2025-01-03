import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { provideDefaults } from '@/utils/analysis'

export const POST = async () => {
  const user = await getUserByClerkID()
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day!',
    },
  })

  const createdAnalysis = await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...provideDefaults(),
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({
    data: {
      ...entry,
      analysis: createdAnalysis,
    },
  })
}
