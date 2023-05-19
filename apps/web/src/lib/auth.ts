import { NextAuthOptions } from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'

import { PrismaAdapter, prisma } from 'database'
import { envs } from '@/utils/envs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter,
  providers: [
    DiscordProvider({
      clientId: envs.DISCORD_CLIENT_ID,
      clientSecret: envs.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      const dbUser = await prisma.user.findFirst({ where: { email: session.user?.email } })

      if (!dbUser || !session.user) {
        return session
      }

      session.user.id = dbUser.id
      return session
    },
  },
}
