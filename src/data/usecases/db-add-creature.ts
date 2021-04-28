import { AddCreature } from '@/domain/usecases'
import { AddCreatureRepository } from '@/data/protocols'

export class DbAddCreature implements AddCreature {
  constructor (private readonly addSurveyRepository: AddCreatureRepository) {}

  async add (data: AddCreature.Params): Promise<void> {
    await this.addSurveyRepository.add(data)
  }
}
