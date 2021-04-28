import { adaptRoute } from '@/main/adapters'
import { makeAddCreatureController, makeLoadCreaturesController, makeLoadCreatureController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/creatures', adaptRoute(makeAddCreatureController()))
  router.get('/creatures', adaptRoute(makeLoadCreaturesController()))
  router.get('/creatures/:id', adaptRoute(makeLoadCreatureController()))
}
