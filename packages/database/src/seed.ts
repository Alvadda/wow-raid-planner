import { PrismaClient } from '@prisma/client'
import { charData } from './seedData/char'
import { factions, servers } from './seedData/server'
const prisma = new PrismaClient()

const createFactions = async () => await Promise.all(factions.map((f) => prisma.faction.create({ data: { name: f } })))

const createServerAndRegion = async () => {
  const regions = new Set<string>()
  servers.forEach((s) => regions.add(s.region))

  const regionsDb = new Map<string, string>()
  for (const region of regions.values()) {
    const created = await prisma.region.create({ data: { name: region } })
    regionsDb.set(created.name, created.id)
  }

  await Promise.all(
    servers.map((s) => {
      const regionId = regionsDb.get(s.region)
      if (!regionId) throw new Error(`no region found for Server ${s.server} - ${s.region}`)

      return prisma.server.create({ data: { name: s.server, regionId } })
    })
  )
}

const createRoles = async () => {
  const roles = new Set<string>()
  charData.forEach((cd) => cd.specs.forEach((s) => roles.add(s.role)))

  const rolesDb = new Map<string, string>()
  for (const role of roles.values()) {
    const created = await prisma.role.create({ data: { name: role } })
    rolesDb.set(created.name, created.id)
  }

  return rolesDb
}

const createClasses = async () => {
  const classes = new Set<string>()
  charData.forEach((cd) => classes.add(cd.class))

  const classesDb = new Map<string, string>()
  for (const wowClass of classes.values()) {
    const created = await prisma.class.create({ data: { name: wowClass } })
    classesDb.set(created.name, created.id)
  }

  return classesDb
}

const createSpecs = async (rolesDb: Map<string, string>, classesDb: Map<string, string>) => {
  const specs = new Set<{ name: string; class: string; role: string }>()
  charData.forEach((cd) => cd.specs.forEach((s) => specs.add({ name: s.name, class: cd.class, role: s.role })))

  const specsDb = new Map<string, string>()
  for (const spec of specs.values()) {
    const roleId = rolesDb.get(spec.role)
    const classId = classesDb.get(spec.class)

    if (!roleId || !classId) throw new Error(`Role or Class does not exit for spec: ${spec}`)

    const created = await prisma.specialization.create({
      data: { name: spec.name, classId, roleId },
    })
    specsDb.set(created.name, created.id)
  }

  return specsDb
}

const createCharData = async () => {
  const rolesDb = await createRoles()
  const classesDb = await createClasses()
  await createSpecs(rolesDb, classesDb)
}

const seed = async () => {
  await createFactions()
  await createServerAndRegion()
  await createCharData()
}

seed()
