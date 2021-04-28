import { CreatureModel } from '@/domain/models'

export interface AddCreature {
  add: (data: AddCreature.Params) => Promise<void>
}

export namespace AddCreature {
  export type Params = CreatureModel
}
