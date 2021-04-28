import { makeLogControllerDecorator, makeDbLoadCreatureById } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadCreatureController } from '@/presentation/controllers'

export const makeLoadCreatureController = (): Controller => {
  const controller = new LoadCreatureController(makeDbLoadCreatureById())
  return makeLogControllerDecorator(controller)
}
