import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { AddCreature } from '@/domain/usecases'

export class AddCreatureController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addCreature: AddCreature
  ) {}

  async handle (request: AddCreatureController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      await this.addCreature.add({
        ...request
      })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddCreatureController {
  export type Request = {
    name: string
  }
}
