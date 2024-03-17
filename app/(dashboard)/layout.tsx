import { UserButton } from '@clerk/nextjs'
import HomeIcon from '@/icons/Home'
import JournalIcon from '@/icons/Journal'
import HistoryIcon from '@/icons/History'
import QuestionIcon from '@/icons/Question'
import NavItem from '@/components/NavItem'

const links = [
  { href: '/', label: 'Home', icon: <HomeIcon /> },
  { href: '/journal', label: 'Journal', icon: <JournalIcon /> },
  { href: '/history', label: 'History', icon: <HistoryIcon /> },
  { href: '/question', label: 'Ask questions', icon: <QuestionIcon /> },
]

const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <header className="col-span-12 h-[60px] border-b border-[#E5E8EB]">
        <div className="h-full w-full px-6 flex items-center justify-between">
          <h1 className="px-2 py-2 text-2xl font-bold">AI Mood Journal</h1>
          <UserButton />
        </div>
      </header>
      <aside className="col-span-3">
        <ul className="mt-4 p-4 flex flex-col gap-2">
          {links.map((link) => (
            <NavItem key={link.href} link={link} />
          ))}
        </ul>
      </aside>
      <div className="col-span-9">
        <main className="col-span-9 h-[calc(100vh-60px)] p-10">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
