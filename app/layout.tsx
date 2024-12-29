import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Journal',
  description: 'Supercharge your journaling with AI',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
