import { makeAddCreatureValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'

jest.mock('@/validation/validators/validation-composite')

describe('AddCreatureValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddCreatureValidation()
    const validations: Validation[] = []
    const fields = [
      'name'
    ]
    for (const field of fields) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
