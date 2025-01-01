import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const { userId } = await auth()

  const href = userId ? '/journal' : '/sign-up'

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[800px] mx-auto">
        <h1 className="text-6xl mb-4">
          Unlock Your Potential: Journaling, Supercharged by AI.
        </h1>
        <p className="text-2xl text-white/60 mb-4">
          Cutting-edge web app powered by artificial intelligence. Seamlessly
          journal your daily emotions and experiences.
        </p>
        <div>
          <Button
            asChild
            className="bg-blue-500 text-gray-50 hover:bg-blue-600 transition-all"
          >
            <Link href={href}>Get started</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
