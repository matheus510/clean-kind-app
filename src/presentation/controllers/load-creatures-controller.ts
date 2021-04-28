import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { LoadCreatureById } from '@/domain/usecases'

export class LoadCreatureController implements Controller {
  constructor (private readonly loadCreature: LoadCreatureById) {}

  async handle (request: LoadCreatureController.Request): Promise<HttpResponse> {
    try {
      const creature = await this.loadCreature.load(request.id)
      return creature ? ok(creature) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadCreatureController {
  export type Request = {
    id: string
  }
}
