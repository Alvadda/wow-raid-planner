import './globals.css'
import { Inter } from 'next/font/google'

import { NextAuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className + ' h-screen flex flex-col bg-neutral-800 text-white'}>
        <header className="flex justify-center shrink-0 p-4 bg-neutral-900 drop-shadow-xl">test</header>
        <main className="flex-1 overflow-y-auto">
          <NextAuthProvider>{children}</NextAuthProvider>
        </main>
      </body>
    </html>
  )
}