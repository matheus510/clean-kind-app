import app from '@/main/config/app'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'

import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

let creatureCollection: Collection
let accountCollection: Collection

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'zeca',
    email: 'zeca.mariategui@gmail.com',
    password: '123',
    role: 'admin'
  })
  const id = res.ops[0]._id
  const accessToken = sign({ id }, env.jwtSecret)
  await accountCollection.updateOne({
    _id: id
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

describe('Creature Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    creatureCollection = await MongoHelper.getCollection('creatures')
    await creatureCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('GET /creatures', () => {
    test('Should return 204 on load creatures with valid accessToken', async () => {
      const accessToken = await mockAccessToken()
      await request(app)
        .get('/api/creatures')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
