import { getServerSession } from 'next-auth'
import { LoginButton, LogoutButton } from '../components/buttons'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1>Index Page</h1>
      <p>Session</p>
      <p>{JSON.stringify(session)}</p>
      <div className="flex items-center justify-center gap-2">{!session ? <LoginButton /> : <LogoutButton />}</div>
    </main>
  )
}
