import { CreatureModel } from '@/domain/models'

export interface LoadCreaturesRepository {
  loadAll: (accountId: string) => Promise<LoadCreaturesRepository.Result>
  loadById: (id: string) => Promise<LoadCreatureRepository.Result>
}

export namespace LoadCreaturesRepository {
  export type Result = CreatureModel[]
}

export namespace LoadCreatureRepository {
  export type Result = CreatureModel
}
