import { makeAddCreatureValidation, makeLogControllerDecorator, makeDbAddCreature } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { AddCreatureController } from '@/presentation/controllers'

export const makeAddCreatureController = (): Controller => {
  const controller = new AddCreatureController(makeAddCreatureValidation(), makeDbAddCreature())
  return makeLogControllerDecorator(controller)
}
