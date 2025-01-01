'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
  link: {
    href: string
    label: string
    icon: React.ReactNode
  }
}

const NavItem = ({ link }: Props) => {
  const pathname = usePathname()
  const isActiveLink = (link: string) => pathname === link

  return (
    <Link href={link.href}>
      <li
        className={`px-3 py-1 text-xl ${
          isActiveLink(link.href) ? 'bg-gray-100' : ''
        } hover:bg-gray-100  rounded-xl cursor-pointer flex items-center gap-4`}
      >
        {link.icon}
        {link.label}
      </li>
    </Link>
  )
}

export { NavItem }
