import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { getAllCharsById } from '@/queries/character'
import { authOptions } from '@/lib/auth'
import { RxPencil2, RxTrash } from 'react-icons/rx'

interface CharCardProps {
  name: string
  charClass: string
  spec: string
  region: string
  server: string
  faction: string
}

const getClassColorBg = (className: string) => {
  switch (className) {
    case 'Warlock':
      return 'bg-class-warlock/25'
    case 'Hunter':
      return 'bg-class-hunter/25'
    default:
      return 'bg-slat-500/25'
  }
}

const getClassColorBorder = (className: string) => {
  switch (className) {
    case 'Warlock':
      return 'border-class-warlock'
    case 'Hunter':
      return 'border-class-hunter'
    default:
      return 'border-class-slat-500'
  }
}

const CharCard = ({ name, charClass, spec, server, faction, region }: CharCardProps) => {
  const bgColor = getClassColorBg(charClass)
  const borderColor = getClassColorBorder(charClass)

  return (
    <div className={`flex gap-2 ${bgColor} rounded-lg border-l-8 ${borderColor} p-2`}>
      <div>
        <p>{name}</p>
        <p>{charClass}</p>
        <p>{spec}</p>
      </div>
      <div>
        <p>{server}</p>
        <p>{faction}</p>
        <p>{region}</p>
      </div>
      <div>
        <RxPencil2 height="50px" width="50px" />
        <RxTrash />
      </div>
    </div>
  )
}

export default async function Characters() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return null

  const chars = await getAllCharsById(session.user.id)

  return (
    <div className="p-4 flex gap-2 flex-col">
      {chars.map((c) => (
        <CharCard key={c.id} name={c.name} charClass={c.class} spec={c.mainSpec} server={c.server} faction={c.faction} region={c.region} />
      ))}
      {/* <Image alt="class icon" src={'/icons/spec_prot.jpg'} height={56} width={56} /> */}
    </div>
  )
}
