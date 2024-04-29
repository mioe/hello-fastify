import fp from 'fastify-plugin'
import fastifyPrintRoutes from 'fastify-print-routes'

export default fp(async(fastify, _opts) => {
	fastify.register(fastifyPrintRoutes)
})
