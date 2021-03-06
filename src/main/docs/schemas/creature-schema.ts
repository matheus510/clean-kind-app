export const creatureSchema = {
  type: 'object',
  properties: {
    _id: {
      type: 'string'
    },
    name: {
      type: 'string'
    }
  },
  required: [
    '_id',
    'name'
  ]
}
