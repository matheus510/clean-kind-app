export const addCreatureParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    }
  },
  required: [
    'name'
  ]
}
