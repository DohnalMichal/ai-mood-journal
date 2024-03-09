import { NextResponse } from 'next/server'
import { getUserByClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

type Params = {
  params: { id: string }
}

export const PATCH = async (request: Request, { params }: Params) => {
  const { updates } = await request.json()
  const user = await getUserByClerkID()

  const entry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        id: params.id,
        userId: user.id,
      },
    },
    data: updates,
  })

  return NextResponse.json({ data: entry })
}
