import { CreatureModel } from '@/domain/models'

export interface LoadCreatures {
  load: (accountId: string) => Promise<LoadCreatures.Result>
}

export namespace LoadCreatures {
  export type Result = CreatureModel[]
}
