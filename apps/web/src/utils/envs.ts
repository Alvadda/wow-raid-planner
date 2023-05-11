import { z } from 'zod'

const envVariables = z.object({
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
  NEXTAUTH_URL: z.string(),
})

export const envs = envVariables.parse(process.env)
