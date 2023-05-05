import { Class, Server, Specialization, Faction, Region } from 'database'
import { getClassById, getFactionById, getRegionById, getServerById, getSpecById } from '../../db/get'

type ValidCharacter = {
  name: string
  class: Class
  mainSpec: Specialization & { class: Class }
  offSpec: Specialization & { class: Class }
  server: Server
  region?: Region
  faction: Faction
}

export type Character = Partial<ValidCharacter>

export const charBuilder = () => {
  const char: Character = {}

  return {
    setName(name: string) {
      char.name = name
    },
    async setClass(classId: string) {
      char.class = (await getClassById(classId)) ?? undefined
      return char.class
    },
    async setMainSpec(specId: string) {
      char.mainSpec = (await getSpecById(specId)) ?? undefined
      return char.mainSpec
    },
    async setOffSpec(specId: string) {
      char.offSpec = (await getSpecById(specId)) ?? undefined
      return char.offSpec
    },
    async setRegion(regionId: string) {
      char.region = (await getRegionById(regionId)) ?? undefined
      return char.region
    },
    async setServer(serverId: string) {
      char.server = (await getServerById(serverId)) ?? undefined
      return char.server
    },
    async setFaction(factionId: string) {
      char.faction = (await getFactionById(factionId)) ?? undefined
      return char.faction
    },
    getCharacter() {
      return char
    },
    getValidCharacter(): ValidCharacter {
      if (!(char.name && char.class && char.mainSpec && char.offSpec && char.server && char.faction)) {
        throw new Error('Character is not valid')
      }

      return {
        name: char.name,
        class: char.class,
        mainSpec: char.mainSpec,
        offSpec: char.offSpec,
        server: char.server,
        faction: char.faction,
      }
    },
  }
}
