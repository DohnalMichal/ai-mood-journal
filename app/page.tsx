import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const { userId } = await auth()

  const href = userId ? '/journal' : '/sign-up'

  return (
    <div className="w-screen h-screen dark bg-background flex flex-col items-center text-foreground">
      <header className="max-w-5xl p-8 w-full flex flex-row justify-between">
        <span className="font-bold tracking-tight">AI Journal</span>
        <nav>
          <ul className="flex flex-row space-x-4">
            <li>
              <Button asChild>
                <Link href="/sign-in">Sign in</Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="w-full h-full max-w-3xl mx-auto flex flex-col justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
          Unlock Your Potential: Journaling, Supercharged by AI.
        </h1>
        <p className="text-2xl text-muted-foreground leading-7 mt-6">
          Cutting-edge web app powered by artificial intelligence. Seamlessly
          journal your daily emotions and experiences.
        </p>
        <div>
          <Button
            asChild
            size="lg"
            className="mt-10 bg-blue-500 text-gray-50 hover:bg-blue-600 transition-all text-lg"
          >
            <Link href={href}>Get started</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
