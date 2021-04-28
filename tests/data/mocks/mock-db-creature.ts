import { AddCreatureRepository, LoadCreatureByIdRepository, LoadCreaturesRepository } from '@/data/protocols'
import { mockCreatureModel, mockCreatureModels } from '@/tests/domain/mocks'

export class AddCreatureRepositorySpy implements AddCreatureRepository {
  params: AddCreatureRepository.Params

  async add (params: AddCreatureRepository.Params): Promise<void> {
    this.params = params
  }
}

export class LoadCreatureByIdRepositorySpy implements LoadCreatureByIdRepository {
  id: string
  result = mockCreatureModel()

  async loadById (id: string): Promise<LoadCreatureByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadCreaturesRepositorySpy implements LoadCreaturesRepository {
  accountId: string
  results = mockCreatureModels()
  result = mockCreatureModel()

  async loadAll (accountId: string): Promise<LoadCreaturesRepository.Result> {
    this.accountId = accountId
    return this.results
  }

  async loadById (id: string): Promise<LoadCreatureByIdRepository.Result> {
    return this.result
  }
}
