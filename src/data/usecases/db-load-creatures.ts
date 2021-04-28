import { LoadCreatures } from '@/domain/usecases'
import { LoadCreaturesRepository } from '@/data/protocols'

export class DbLoadCreatures implements LoadCreatures {
  constructor (private readonly loadCreaturesRepository: LoadCreaturesRepository) {}

  async load (accountId: string): Promise<LoadCreatures.Result> {
    return this.loadCreaturesRepository.loadAll(accountId)
  }
}
