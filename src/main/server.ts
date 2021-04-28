import 'module-alias/register'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log('\x1b[45m%s\x1b[0m', `server up on ${env.port}`))
  })
  .catch(console.error)
