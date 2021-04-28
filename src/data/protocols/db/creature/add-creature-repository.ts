import { AddCreature } from '@/domain/usecases'

export interface AddCreatureRepository {
  add: (data: AddCreatureRepository.Params) => Promise<void>
}

export namespace AddCreatureRepository {
  export type Params = AddCreature.Params
}
