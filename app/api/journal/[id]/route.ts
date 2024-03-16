import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { analyze } from '@/utils/ai'
import { provideDefaults } from '@/utils/analysis'

type Params = {
  params: { id: string }
}

export const PATCH = async (request: Request, { params }: Params) => {
  const { content } = await request.json()
  const user = await getUserByClerkID()

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    data: content,
  })

  const analysis = await analyze(updatedEntry.content)

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...provideDefaults(analysis),
    },
    update: {
      ...provideDefaults(analysis),
    },
  })

  revalidatePath('/journal')

  return NextResponse.json({
    data: {
      ...updatedEntry,
      analysis: updatedAnalysis,
    },
  })
}
