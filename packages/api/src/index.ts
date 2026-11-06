import Fastify from 'fastify'
import { env } from './env.ts'

const fastify = Fastify({
  logger: true,
  trustProxy: true,
})

fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

fastify.listen(
  {
    port: env.PORT,
    host: env.HOST,
  },
  function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(`Server is now listening on ${address}`)
  },
)
