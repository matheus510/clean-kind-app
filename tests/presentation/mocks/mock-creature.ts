import { CreatureModel } from '@/domain/models'
import { AddCreature, LoadCreatures, LoadCreatureById } from '@/domain/usecases'
import { mockCreatureModel, mockCreatureModels } from '@/tests/domain/mocks'

export class AddCreatureSpy implements AddCreature {
  params: AddCreature.Params

  async add (params: AddCreature.Params): Promise<void> {
    this.params = params
  }
}

export class LoadCreaturesSpy implements LoadCreatures {
  accountId: string
  result = mockCreatureModels()

  async load (accountId: string): Promise<LoadCreatures.Result> {
    this.accountId = accountId
    return this.result
  }
}

export class LoadCreatureByIdSpy implements LoadCreatureById {
  id: string
  result: CreatureModel

  async load (id: string): Promise<LoadCreatureById.Result> {
    this.id = id
    this.result = mockCreatureModel()
    return this.result
  }
}
