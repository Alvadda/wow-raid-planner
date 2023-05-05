import { SlashCommandBuilder, ChatInputCommandInteraction, CacheType, EmbedBuilder, ComponentType } from 'discord.js'

import { getCharByName } from '../../db/get'
import {
  INTERACTIONS,
  getConfirmMessage,
  getSelectClassMessage,
  getSelectFractionMessage,
  getSelectMainSpecMessage,
  getSelectNameMessage,
  getSelectOffSpecMessage,
  getSelectRegionMessage,
  getSelectServerMessage,
} from './interactions'
import { charBuilder } from './charBuilder'
import { createCharacter } from '../../db/create'

const TIMEOUT = 300000

export default {
  data: new SlashCommandBuilder().setName('create_char').setDescription('Create a new character'),
  async execute(interaction: ChatInputCommandInteraction<CacheType>) {
    const dmChannel = await interaction.user.createDM()
    const character = charBuilder()

    const dmCollector = dmChannel.createMessageCollector({
      filter: (msg) => msg.author.id === interaction.user.id,
      time: TIMEOUT,
    })

    // Todo Check for Uniq Name CharName/Server
    await dmChannel.send(getSelectNameMessage())

    dmCollector.on('collect', async (msg) => {
      const selectCollector = dmChannel.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: TIMEOUT })
      const buttonCollector = dmChannel.createMessageComponentCollector({ componentType: ComponentType.Button, time: TIMEOUT })
      const { content } = msg
      const charExists = await getCharByName(content)

      if (charExists) {
        dmChannel.send('Sorry, that character name is already taken. Please enter a different name.')
        return
      }

      if (character.getCharacter().name) return

      character.setName(content)
      await dmChannel.send(await getSelectClassMessage())

      selectCollector.on('collect', async (selectInteraction) => {
        if (selectInteraction.user.id !== interaction.user.id) return

        switch (selectInteraction.customId) {
          case INTERACTIONS.SELECT_ClASS: {
            const selectedClass = await character.setClass(selectInteraction.values[0])

            if (!selectedClass) {
              dmChannel.send('Error pls try again')
              break
            }

            await selectInteraction.update({
              components: [],
              embeds: [new EmbedBuilder().addFields({ name: 'Class', value: selectedClass.name })],
            })
            await dmChannel.send(await getSelectMainSpecMessage(selectedClass.id))
            break
          }
          case INTERACTIONS.SELECT_MAIN_SPEC: {
            const selectedMainSpec = await character.setMainSpec(selectInteraction.values[0])

            if (!selectedMainSpec) {
              dmChannel.send('Error pls try again')
              break
            }

            await selectInteraction.update({
              components: [],
              embeds: [new EmbedBuilder().addFields({ name: 'Main Spec', value: selectedMainSpec.name })],
            })
            await dmChannel.send(await getSelectOffSpecMessage(selectedMainSpec.class.id))
            break
          }
          case INTERACTIONS.SELECT_OFF_SPEC: {
            const selectedOffSpec = await character.setOffSpec(selectInteraction.values[0])

            if (!selectedOffSpec) {
              dmChannel.send('Error pls try again')
              break
            }

            await selectInteraction.update({
              components: [],
              embeds: [new EmbedBuilder().addFields({ name: 'Off Spec', value: selectedOffSpec.name })],
            })
            await dmChannel.send(await getSelectRegionMessage())
            break
          }
          case INTERACTIONS.SELECT_REGION: {
            const selectedRegion = await character.setRegion(selectInteraction.values[0])

            if (!selectedRegion) {
              dmChannel.send('Error pls try again')
              break
            }

            await selectInteraction.update({
              components: [],
              embeds: [new EmbedBuilder().addFields({ name: 'Region', value: selectedRegion.name })],
            })
            await dmChannel.send(await getSelectServerMessage(selectedRegion.id))
            break
          }
          case INTERACTIONS.SELECT_SERVER: {
            const selectedServer = await character.setServer(selectInteraction.values[0])

            if (!selectedServer) {
              dmChannel.send('Error pls try again')
              break
            }

            await selectInteraction.update({
              components: [],
              embeds: [new EmbedBuilder().addFields({ name: 'Server', value: selectedServer.name })],
            })
            await dmChannel.send(await getSelectFractionMessage())
            break
          }
          case INTERACTIONS.SELECT_FACTION: {
            const selectedFaction = await character.setFaction(selectInteraction.values[0])

            if (!selectedFaction) {
              dmChannel.send('Error pls try again')
              break
            }

            await selectInteraction.update({
              components: [],
              embeds: [new EmbedBuilder().addFields({ name: 'Faction', value: selectedFaction.name })],
            })
            await dmChannel.send(await getConfirmMessage(character.getCharacter()))
            break
          }
          default:
            break
        }
      })

      buttonCollector.on('collect', async (buttonInteraction) => {
        if (buttonInteraction.user.id !== interaction.user.id) return

        if (buttonInteraction.customId === INTERACTIONS.CONFIRM) {
          await buttonInteraction.deferUpdate()

          try {
            const validChar = character.getValidCharacter()
            await createCharacter({
              discordUser: interaction.user,
              character: {
                name: validChar.name,
                mainSpecId: validChar.mainSpec.id,
                offSpecId: validChar.offSpec.id,
                serverId: validChar.server.id,
                factionId: validChar.faction.id,
              },
            })

            await buttonInteraction.followUp('Character created!')
            dmCollector.stop()
            selectCollector.stop()
          } catch (error) {
            // TODO Proper Error Handling
            console.log(error)
            dmChannel.send('Error doing character creation')
          }
        }
      })
    })

    await interaction.reply('Check your DMs!')
  },
}
