import { Character, Prisma } from '@prisma/client'
import { prisma } from 'database'
import { User as DiscordUser } from 'discord.js'

type CreateCharacterParams = {
  discordUser: DiscordUser
  character: Pick<Character, 'name' | 'mainSpecId' | 'offSpecId' | 'serverId' | 'factionId'>
}

export const createCharacter = async ({ discordUser, character }: CreateCharacterParams) => {
  let user = await prisma.user.findFirst({ where: { discordId: discordUser.id } })

  if (!user) {
    user = await prisma.user.create({ data: { discordId: discordUser.id, name: discordUser.username } })
  }

  if (!user) throw new Error('Could not create or find user')

  console.log(character)

  try {
    await prisma.character.create({
      data: {
        name: character.name,
        mainSpecId: character.mainSpecId,
        offSpecId: character.offSpecId,
        serverId: character.serverId,
        factionId: character.factionId,
        userId: user.id,
      },
    })
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      throw e.message
    }
    throw e
  }
}
