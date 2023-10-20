import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/const'


export const metadata: Metadata = {
  title: 'HN',
  description: 'yet another hacker news clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
