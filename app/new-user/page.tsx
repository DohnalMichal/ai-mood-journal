import { redirect } from 'next/navigation'
import { currentUser } from '@clerk/nextjs/server'
import { prisma } from '@/utils/db'

const createNewUser = async () => {
  // User will always be defined because the middleware
  // blocks this page for unauthenticated users.
  const user = await currentUser()

  if (!user) {
    return redirect('/sign-up')
  }

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  })

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    })
  }

  redirect('/journal')
}

const NewUserPage = async () => {
  await createNewUser()

  return <div>...loading</div>
}

export default NewUserPage
