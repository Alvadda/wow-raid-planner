import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { getAllCharsById } from '@/queries/character'
import { authOptions } from '@/lib/auth'

export default async function Characters() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return null

  const chars = await getAllCharsById(session.user.id)

  return (
    <div>
      {JSON.stringify(chars)}
      <Image alt="class icon" src={'/icons/spec_prot.jpg'} height={56} width={56} />
    </div>
  )
}
