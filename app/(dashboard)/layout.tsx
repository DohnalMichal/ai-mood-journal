import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const DashboardLayout = ({ children }: Props) => {
  return <div>{children}</div>
}

export default DashboardLayout
