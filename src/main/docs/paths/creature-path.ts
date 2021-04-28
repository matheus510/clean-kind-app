export const creaturePath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Creature'],
    summary: 'List of all creatures',
    description: 'Only **authenticated users** can use this route',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/creatures'
            }
          }
        }
      },
      204: {
        description: 'Success'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Creature'],
    summary: 'Create a creature',
    description: 'Only **authenticated users** can use this route',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addCreatureParams'
          }
        }
      }
    },
    responses: {
      204: {
        description: 'Success'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
