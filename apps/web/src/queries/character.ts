import { prisma } from 'database'

export async function getAllCharsById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      characters: {
        include: { mainSpec: { include: { class: true } }, offSpec: true, faction: true, server: { include: { region: true } } },
      },
    },
  })

  if (!user) return []

  return user.characters.map((c) => ({
    id: c.id,
    name: c.name,
    class: c.mainSpec.class.name,
    mainSpec: c.mainSpec.name,
    offSpec: c.offSpec.name,
    server: c.server.name,
    region: c.server.region.name,
    faction: c.faction.name,
  }))
}
