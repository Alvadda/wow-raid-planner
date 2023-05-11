import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

import { PrismaAdapter } from 'database'
import { envs } from '@/utils/envs'

export const authOptions = {
  adapter: PrismaAdapter,
  providers: [
    DiscordProvider({
      clientId: envs.DISCORD_CLIENT_ID,
      clientSecret: envs.DISCORD_CLIENT_SECRET,
    }),
  ],
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
