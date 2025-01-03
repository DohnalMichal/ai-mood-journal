import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { analyze } from '@/utils/ai'
import { provideDefaults } from '@/utils/analysis'

type Params = {
  params: Promise<{ id: string }>
}

export const PATCH = async (request: Request, { params }: Params) => {
  const { content } = await request.json()
  const user = await getUserByClerkID()

  const { id } = await params

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id,
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

export const GET = async (request: Request, { params }: Params) => {
  const { id } = await params

  try {
    const user = await getUserByClerkID()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch the JournalEntry along with its related Analysis
    const entry = await prisma.journalEntry.findUnique({
      where: {
        userId_id: { userId: user.id, id },
      },
      select: {
        analysis: {
          select: {
            subject: true, // Fetch the 'subject' from Analysis
          },
        },
      },
    })

    if (!entry || !entry.analysis) {
      return NextResponse.json(
        { error: 'Entry not found or no analysis available' },
        { status: 404 },
      )
    }

    return NextResponse.json({ title: entry.analysis.subject })
  } catch (error) {
    console.error('Error fetching journal entry:', error)

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
}

export const DELETE = async (request: Request, { params }: Params) => {
  const { id } = await params

  const user = await getUserByClerkID()

  const deletedEntry = await prisma.journalEntry.delete({
    where: {
      userId_id: {
        id,
        userId: user.id,
      },
    },
  })

  // revalidatePath('/journal')

  return NextResponse.json({ data: deletedEntry })
}
