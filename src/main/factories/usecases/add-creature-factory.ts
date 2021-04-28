import { AddCreature } from '@/domain/usecases'
import { CreatureMongoRepository } from '@/infra/db'
import { DbAddCreature } from '@/data/usecases'

export const makeDbAddCreature = (): AddCreature => {
  const surveyMongoRepository = new CreatureMongoRepository()
  return new DbAddCreature(surveyMongoRepository)
}
