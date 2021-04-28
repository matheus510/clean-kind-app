import { CreatureModel } from '@/domain/models'

export interface LoadCreatureByIdRepository {
  loadById: (id: string) => Promise<LoadCreatureByIdRepository.Result>
}

export namespace LoadCreatureByIdRepository {
  export type Result = CreatureModel
}
