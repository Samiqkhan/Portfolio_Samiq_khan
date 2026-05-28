import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Samiq portfolio',
  description: 'Representation of my skills and projects',
  generator: 'react, next.js, tailwindcss',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
