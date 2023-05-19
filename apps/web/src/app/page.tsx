import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="">
      <h1>Index Page</h1>
      <p>Session</p>
      <p>{JSON.stringify(session?.user?.name)}</p>
    </div>
  )
}
