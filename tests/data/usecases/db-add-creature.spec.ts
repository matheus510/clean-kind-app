import { DbAddCreature } from '@/data/usecases'
import { AddCreatureRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockAddCreatureParams } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddCreature
  addCreatureRepositorySpy: AddCreatureRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCreatureRepositorySpy = new AddCreatureRepositorySpy()
  const sut = new DbAddCreature(addCreatureRepositorySpy)
  return {
    sut,
    addCreatureRepositorySpy
  }
}

describe('DbAddCreature Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddCreatureRepository with correct values', async () => {
    const { sut, addCreatureRepositorySpy } = makeSut()
    const creatureData = mockAddCreatureParams()
    await sut.add(creatureData)
    expect(addCreatureRepositorySpy.params).toEqual(creatureData)
  })

  test('Should throw if AddCreatureRepository throws', async () => {
    const { sut, addCreatureRepositorySpy } = makeSut()
    jest.spyOn(addCreatureRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddCreatureParams())
    await expect(promise).rejects.toThrow()
  })
})
