import { MongoHelper, QueryBuilder } from '@/infra/db'
import { AddCreatureRepository, LoadCreaturesRepository, LoadCreatureByIdRepository } from '@/data/protocols/db'

export class CreatureMongoRepository implements AddCreatureRepository, LoadCreaturesRepository, LoadCreatureByIdRepository {
  async add (data: AddCreatureRepository.Params): Promise<void> {
    const creatureCollection = await MongoHelper.getCollection('creatures')
    await creatureCollection.insertOne(data)
  }

  async loadAll (accountId: string): Promise<LoadCreaturesRepository.Result> {
    const creatureCollection = await MongoHelper.getCollection('creatures')
    const query = new QueryBuilder()
      .match({})
      .build()
    const creatures = await creatureCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(creatures)
  }

  async loadById (id: string): Promise<LoadCreatureByIdRepository.Result> {
    const creatureCollection = await MongoHelper.getCollection('creatures')
    const creature = await creatureCollection.findOne({ _id: id })
    return creature && MongoHelper.map(creature)
  }
}
