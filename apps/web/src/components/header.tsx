import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { LogoutButton } from './buttons/logout'
import { LoginButton } from './buttons/login'
import { authOptions } from '@/lib/auth'

export const Header = async () => {
  const session = await getServerSession(authOptions)

  const profilePicture = session?.user?.image

  return (
    <div className="bg-zinc-900 shadow-xl flex justify-end align-middle gap-7 px-4 py-2">
      <div className="flex justify-start items-center flex-grow text-xl">
        <p>WoW Raid Planner</p>
      </div>
      <nav className="flex justify-center gap-5 align-middle">
        <Link className="flex items-center hover:underline" href={'/'}>
          Dashboard
        </Link>
        <Link className="flex items-center hover:underline" href={'/characters'}>
          Characters
        </Link>
        <Link className="flex items-center hover:underline" href={'/communities'}>
          Communities
        </Link>
        <Link className="flex items-center hover:underline" href={'/raids'}>
          Raids
        </Link>
      </nav>
      {profilePicture ? <LogoutButton profilePicture={profilePicture} /> : <LoginButton />}
    </div>
  )
}
