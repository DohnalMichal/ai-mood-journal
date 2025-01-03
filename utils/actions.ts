'use server'

import { prisma } from './db'

export const deleteEntry = async (id: string) => {
  await prisma.journalEntry.delete({
    where: {
      id,
    },
  })
}

//   const { id } = await params

//   const user = await getUserByClerkID()

//   const deletedEntry = await prisma.journalEntry.delete({
//     where: {
//       userId_id: {
//         id,
//         userId: user.id,
//       },
//     },
//   })
