import { getServerSession } from 'next-auth'
import { LoginButton, LogoutButton } from '../components/buttons'
import { authOptions } from './api/auth/[...nextauth]/route'
import { prisma, Character } from 'database'

export default async function Home() {
  const session = await getServerSession(authOptions)
  let chars: Character[] | undefined = undefined
  const userEmail = session?.user?.email

  if (userEmail) {
    const user = await prisma.user.findFirst({
      where: { email: userEmail },
      include: { characters: { include: { mainSpec: true, offSpec: true, faction: true, server: true } } },
    })
    chars = user?.characters
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>Index Page</h1>
      <p>Session</p>
      <p>{JSON.stringify(session)}</p>
      {chars ? JSON.stringify(chars) : null}
      <div className="flex items-center justify-center gap-2">{!session ? <LoginButton /> : <LogoutButton />}</div>
    </main>
  )
}
