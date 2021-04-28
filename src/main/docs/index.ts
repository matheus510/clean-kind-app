import paths from './paths'
import components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Gaivota test - API',
    description: 'This documentation is made by Matheus Fonseca, inspired by Rodrigo Manguinho, implementing Typescript, TDD, Clean Architecture',
    version: '1.0.0',
    contact: {
      name: 'Matheus Fonseca',
      email: 'matheus510.fonseca@gmail.com',
      url: 'https://www.linkedin.com/in/matheussmfonseca'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Main routes'
  }],
  tags: [{
    name: 'Login',
    description: 'Login related routes'
  }, {
    name: 'Creature',
    description: 'Creature related routes'
  }],
  paths,
  schemas,
  components
}
