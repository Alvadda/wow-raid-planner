'use client'

import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { Tooltip } from '../tooltip'

interface Props {
  profilePicture: string
}

export const LogoutButton = ({ profilePicture }: Props) => {
  return (
    <Tooltip content={'Logout'}>
      <button onClick={() => signOut()}>
        <Image className="rounded-full" alt="user profile picture" src={profilePicture} width={50} height={50} />
      </button>
    </Tooltip>
  )
}
