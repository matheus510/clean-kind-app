import { CreatureMongoRepository, MongoHelper } from '@/infra/db'
import { mockAddCreatureParams, mockAddAccountParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'
import FakeObjectId from 'bson-objectid'

let creatureCollection: Collection
let accountCollection: Collection

const mockAccountId = async (): Promise<string> => {
  const res = await accountCollection.insertOne(mockAddAccountParams())
  return res.ops[0]._id
}

const makeSut = (): CreatureMongoRepository => {
  return new CreatureMongoRepository()
}

describe('CreatureMongoRepository', () => {
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

  describe('add()', () => {
    test('Should add a creature on success', async () => {
      const sut = makeSut()
      await sut.add(mockAddCreatureParams())
      const count = await creatureCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('loadAll()', () => {
    test('Should load all creatures on success', async () => {
      const accountId = await mockAccountId()
      const addCreatureModels = [mockAddCreatureParams(), mockAddCreatureParams()]
      await creatureCollection.insertMany(addCreatureModels)
      const sut = makeSut()
      const creatures = await sut.loadAll(accountId)
      expect(creatures.length).toBe(2)
      expect(creatures[0].name).toBeTruthy()
      expect(creatures[1].name).toBeTruthy()
    })

    test('Should load empty list', async () => {
      const accountId = await mockAccountId()
      const sut = makeSut()
      const creatures = await sut.loadAll(accountId)
      expect(creatures.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load creature by id on success', async () => {
      const res = await creatureCollection.insertOne(mockAddCreatureParams())
      const sut = makeSut()
      const creature = await sut.loadById(res.ops[0].name)
      expect(creature).toBe(null)
    })

    test('Should return null if creature does not exists', async () => {
      const sut = makeSut()
      const creature = await sut.loadById(FakeObjectId.generate())
      expect(creature).toBeFalsy()
    })
  })
})
