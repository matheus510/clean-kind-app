import {
  accountSchema,
  loginParamsSchema,
  errorSchema,
  creaturesSchema,
  creatureSchema,
  signUpParamsSchema,
  addCreatureParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  loginParams: loginParamsSchema,
  signUpParams: signUpParamsSchema,
  addCreatureParams: addCreatureParamsSchema,
  error: errorSchema,
  creatures: creaturesSchema,
  creature: creatureSchema
}
