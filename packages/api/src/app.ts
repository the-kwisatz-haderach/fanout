import Fastify, {
  type FastifyInstance,
  type FastifyServerOptions,
} from 'fastify'

export function app(options: FastifyServerOptions): FastifyInstance {
  const fastify = Fastify(options)

  fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })

  return fastify
}
