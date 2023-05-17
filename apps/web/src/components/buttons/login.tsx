'use client'

import { signIn } from 'next-auth/react'

export const LoginButton = () => {
  return (
    <button className="bg-discord hover:bg-discord/75 py-3 px-6 rounded-md" onClick={() => signIn('discord')}>
      Login
    </button>
  )
}
