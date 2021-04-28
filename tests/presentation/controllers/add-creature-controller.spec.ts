import { AddCreatureController } from '@/presentation/controllers'
import { badRequest, serverError, noContent } from '@/presentation/helpers'
import { ValidationSpy, AddCreatureSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

const mockRequest = (): AddCreatureController.Request => ({
  name: 'string'
})

type SutTypes = {
  sut: AddCreatureController
  validationSpy: ValidationSpy
  addCreatureSpy: AddCreatureSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addCreatureSpy = new AddCreatureSpy()
  const sut = new AddCreatureController(validationSpy, addCreatureSpy)
  return {
    sut,
    validationSpy,
    addCreatureSpy
  }
}

describe('AddCreature Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should call AddCreature with correct values', async () => {
    const { sut, addCreatureSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCreatureSpy.params).toEqual({ ...request })
  })

  test('Should return 500 if AddCreature throws', async () => {
    const { sut, addCreatureSpy } = makeSut()
    jest.spyOn(addCreatureSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
