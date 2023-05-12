import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'

export const Header = async () => {
  const session = await getServerSession(authOptions)

  const profilePicture = session?.user?.image

  return (
    <div className="bg-gray-1000 shadow-xl flex justify-end align-middle gap-5 p-2">
      <nav className="flex justify-center gap-3 align-middle">
        <Link className="flex items-center" href={'/'}>
          Dashboard
        </Link>
        <Link className="flex items-center" href={'/'}>
          Test
        </Link>
      </nav>
      {profilePicture ? <Image className="rounded-full" alt="user profile picture" src={profilePicture} width={50} height={50} /> : null}
    </div>
  )
}
