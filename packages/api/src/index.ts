import { env } from './env.ts'
import { app } from './app.ts'

const fastify = app({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
    },
  },
  trustProxy: true,
})

fastify.listen(
  {
    port: env.PORT,
    host: env.HOST,
  },
  function (err, address) {
    if (err) {
      fastify.log.error(err)
      throw err
    }
    console.log(`Server is now listening on ${address}`)
  },
)
