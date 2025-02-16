'use client'

import { CircleHelp, Clock, House, NotebookPen } from 'lucide-react'

import { NavMain } from '@/components/nav-main'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar'

const items = [
  {
    title: 'Home',
    url: '/home',
    icon: House,
    isActive: true,
  },
  {
    title: 'Journal',
    url: '/journal',
    icon: NotebookPen,
  },
  {
    title: 'History',
    url: '/history',
    icon: Clock,
  },
  {
    title: 'Ask questions',
    url: '/question',
    icon: CircleHelp,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton>
          <span className="truncate font-semibold">AI Mood Journal</span>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
