import Link from 'next/link'
import { auth } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const { userId } = await auth()

  const href = userId ? '/journal' : '/sign-up'

  return (
    <div className="dark flex h-screen w-screen flex-col items-center bg-background text-foreground">
      <header className="flex w-full max-w-5xl flex-row justify-between p-8">
        <span className="font-bold tracking-tight">AI Journal</span>
        <nav>
          <ul className="flex flex-row space-x-4">
            <li>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Log in</Link>
              </Button>
            </li>
            <li>
              <Button variant="default" asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <div className="mx-auto flex h-full w-full max-w-3xl flex-col justify-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
          Unlock Your Potential: Journaling, Supercharged by AI.
        </h1>
        <p className="mt-6 text-2xl leading-7 text-muted-foreground">
          Cutting-edge web app powered by artificial intelligence. Seamlessly
          journal your daily emotions and experiences.
        </p>
        <div>
          <Button
            asChild
            size="lg"
            className="mt-10 bg-blue-500 text-lg text-gray-50 transition-all hover:bg-blue-600"
          >
            <Link href={href}>Get started</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
