import { DbLoadCreatureById } from '@/data/usecases'
import { LoadCreatureByIdRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadCreatureById
  loadCreatureByIdRepositorySpy: LoadCreatureByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCreatureByIdRepositorySpy = new LoadCreatureByIdRepositorySpy()
  const sut = new DbLoadCreatureById(loadCreatureByIdRepositorySpy)
  return {
    sut,
    loadCreatureByIdRepositorySpy
  }
}

let creatureId: string

describe('DbLoadCreatureById', () => {
  beforeEach(() => {
    creatureId = faker.datatype.uuid()
  })

  test('Should call LoadCreatureByIdRepository', async () => {
    const { sut, loadCreatureByIdRepositorySpy } = makeSut()
    await sut.load(creatureId)
    expect(loadCreatureByIdRepositorySpy.id).toBe(creatureId)
  })

  test('Should return true if LoadCreatureByIdRepository returns true', async () => {
    const { sut } = makeSut()
    const exists = await sut.load(creatureId)
    expect(exists).toBeTruthy()
  })

  test('Should return false if LoadCreatureByIdRepository returns false', async () => {
    const { sut, loadCreatureByIdRepositorySpy } = makeSut()
    loadCreatureByIdRepositorySpy.result = null
    const exists = await sut.load(creatureId)
    expect(exists).toBe(null)
  })

  test('Should throw if LoadCreatureByIdRepository throws', async () => {
    const { sut, loadCreatureByIdRepositorySpy } = makeSut()
    jest.spyOn(loadCreatureByIdRepositorySpy, 'loadById').mockImplementationOnce(throwError)
    const promise = sut.load(creatureId)
    await expect(promise).rejects.toThrow()
  })
})
