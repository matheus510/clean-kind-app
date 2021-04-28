import { LoadCreatureById } from '@/domain/usecases'
import { LoadCreatureByIdRepository } from '@/data/protocols'

export class DbLoadCreatureById implements LoadCreatureById {
  constructor (
    private readonly loadCreatureByIdRepository: LoadCreatureByIdRepository
  ) {}

  async load (creatureId: string): Promise<LoadCreatureById.Result> {
    const creature = await this.loadCreatureByIdRepository.loadById(creatureId)
    if (creature) {
      return creature
    }
    return null
  }
}
