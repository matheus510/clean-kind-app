import { Controller, HttpResponse } from '@/presentation/protocols'
import { noContent, serverError, ok } from '@/presentation/helpers'
import { LoadCreatures } from '@/domain/usecases'

export class LoadCreaturesController implements Controller {
  constructor (private readonly loadCreatures: LoadCreatures) {}

  async handle (request: LoadCreaturesController.Request): Promise<HttpResponse> {
    try {
      const creature = await this.loadCreatures.load(request.accountId)
      return creature.length ? ok(creature) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadCreaturesController {
  export type Request = {
    accountId: string
  }
}
