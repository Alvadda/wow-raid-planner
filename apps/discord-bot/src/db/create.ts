import { Character, Prisma } from '@prisma/client'
import { prisma } from 'database'
import { User as DiscordUser } from 'discord.js'

type CreateCharacterParams = {
  discordUser: DiscordUser
  character: Pick<Character, 'name' | 'mainSpecId' | 'offSpecId' | 'serverId' | 'factionId'>
}

export const createCharacter = async ({ discordUser, character }: CreateCharacterParams) => {
  const account = await prisma.account.findFirst({ where: { providerAccountId: discordUser.id }, include: { user: true } })

  if (!account) throw new Error('Could not create or find user')

  console.log(character)

  try {
    await prisma.character.create({
      data: {
        name: character.name,
        mainSpecId: character.mainSpecId,
        offSpecId: character.offSpecId,
        serverId: character.serverId,
        factionId: character.factionId,
        userId: account.userId,
      },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw e.message
    }
    throw e
  }
}
