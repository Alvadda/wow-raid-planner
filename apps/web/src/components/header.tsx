import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

export const Header = async () => {
  const session = await getServerSession(authOptions)

  const profilePicture = session?.user?.image

  return (
    <div className="bg-neutral-800 shadow-xl flex justify-end">
      <nav className="flex justify-center gap-3">
        <Link href={'/'}>Dashboard</Link>
        <Link href={'/'}>Test</Link>
      </nav>
      {profilePicture ? <Image className="rounded-full" alt="user profile picture" src={profilePicture} width={60} height={60} /> : null}
    </div>
  )
}
