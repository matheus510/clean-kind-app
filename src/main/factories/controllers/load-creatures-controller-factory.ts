import { makeLogControllerDecorator, makeDbLoadCreatures } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadCreaturesController } from '@/presentation/controllers'

export const makeLoadCreaturesController = (): Controller => {
  const controller = new LoadCreaturesController(makeDbLoadCreatures())
  return makeLogControllerDecorator(controller)
}
