import { LoadCreaturesController } from '@/presentation/controllers'
import { ok, serverError, noContent } from '@/presentation/helpers'
import { LoadCreaturesSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): LoadCreaturesController.Request => ({ accountId: faker.datatype.uuid() })

type SutTypes = {
  sut: LoadCreaturesController
  loadCreaturesSpy: LoadCreaturesSpy
}

const makeSut = (): SutTypes => {
  const loadCreaturesSpy = new LoadCreaturesSpy()
  const sut = new LoadCreaturesController(loadCreaturesSpy)
  return {
    sut,
    loadCreaturesSpy
  }
}

describe('LoadCreatures Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadCreatures with correct value', async () => {
    const { sut, loadCreaturesSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadCreaturesSpy.accountId).toBe(request.accountId)
  })

  test('Should return 200 on success', async () => {
    const { sut, loadCreaturesSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadCreaturesSpy.result))
  })

  test('Should return 204 if LoadCreatures returns empty', async () => {
    const { sut, loadCreaturesSpy } = makeSut()
    loadCreaturesSpy.result = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 500 if LoadCreatures throws', async () => {
    const { sut, loadCreaturesSpy } = makeSut()
    jest.spyOn(loadCreaturesSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
