import { getServerSession } from 'next-auth'

import { prisma, Character } from 'database'
import { authOptions } from './api/auth/[...nextauth]/route'
import { LoginButton, LogoutButton } from '@/components/buttons'

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
    <div className="">
      <h1>Index Page</h1>
      <p>Session</p>
      <p>{JSON.stringify(session)}</p>
      Chars:
      {chars ? JSON.stringify(chars) : null}
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <div className="">{!session ? <LoginButton /> : <LogoutButton />}</div>
      <p>123</p>
    </div>
  )
}
