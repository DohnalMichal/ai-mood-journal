import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import type { ReactNode } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
]

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
        <h1 className="px-2 py-2 text-2xl">AI Mood Journal</h1>
        <ul className="mt-4 flex flex-col gap-2">
          {links.map((link) => (
            <li key={link.href} className="px-2 text-xl">
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <main className="h-[calc(100vh-60px)]">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
