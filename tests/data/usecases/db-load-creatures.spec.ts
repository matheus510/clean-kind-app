import { DbLoadCreatures } from '@/data/usecases'
import { LoadCreaturesRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

type SutTypes = {
  sut: DbLoadCreatures
  loadCreaturesRepositorySpy: LoadCreaturesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCreaturesRepositorySpy = new LoadCreaturesRepositorySpy()
  const sut = new DbLoadCreatures(loadCreaturesRepositorySpy)
  return {
    sut,
    loadCreaturesRepositorySpy
  }
}

describe('DbLoadCreatures', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadCreaturesRepository', async () => {
    const { sut, loadCreaturesRepositorySpy } = makeSut()
    const accountId = faker.datatype.uuid()
    await sut.load(accountId)
    expect(loadCreaturesRepositorySpy.accountId).toBe(accountId)
  })

  test('Should return a list of Creatures on success', async () => {
    const { sut, loadCreaturesRepositorySpy } = makeSut()
    const creatures = await sut.load(faker.datatype.uuid())
    expect(creatures[0]).toEqual(loadCreaturesRepositorySpy.result)
  })

  test('Should throw if LoadCreaturesRepository throws', async () => {
    const { sut, loadCreaturesRepositorySpy } = makeSut()
    jest.spyOn(loadCreaturesRepositorySpy, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load(faker.datatype.uuid())
    await expect(promise).rejects.toThrow()
  })
})
