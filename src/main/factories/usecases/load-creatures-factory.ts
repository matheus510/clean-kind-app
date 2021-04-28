import { CreatureMongoRepository } from '@/infra/db'
import { LoadCreatures } from '@/domain/usecases'
import { DbLoadCreatures } from '@/data/usecases'

export const makeDbLoadCreatures = (): LoadCreatures => {
  const creatureMongoRepository = new CreatureMongoRepository()
  return new DbLoadCreatures(creatureMongoRepository)
}
