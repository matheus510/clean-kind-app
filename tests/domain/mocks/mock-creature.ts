import { CreatureModel } from '@/domain/models'
import { AddCreature } from '@/domain/usecases'

export const mockCreatureModel = (): CreatureModel => {
  return {
    name: 'string'
  }
}

export const mockCreatureModels = (): CreatureModel[] => [
  mockCreatureModel(),
  mockCreatureModel()
]

export const mockAddCreatureParams = (): AddCreature.Params => ({
  name: 'string'
})
