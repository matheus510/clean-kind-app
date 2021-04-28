import { CreatureMongoRepository } from '@/infra/db'
import { LoadCreatureById } from '@/domain/usecases'
import { DbLoadCreatureById } from '@/data/usecases'

export const makeDbLoadCreatureById = (): LoadCreatureById => {
  const creatureMongoRepository = new CreatureMongoRepository()
  return new DbLoadCreatureById(creatureMongoRepository)
}
