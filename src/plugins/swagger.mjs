import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@scalar/fastify-api-reference'

export default fp(async(fastify, _opts) => {
	fastify.register(swagger, {
		openapi: {
			info: {
				title: 'hello-fastify',
				description: '🦕 wonderful world',
				version: '0.0.1',
			},
			servers: [
				{
					url: 'http://localhost:3000',
					description: 'Development server',
				},
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
			},
			security: [{
				bearerAuth: [],
			}],
		},
		hideUntagged: true,
		exposeRoute: true,
	})

	fastify.register(swaggerUi, {
		routePrefix: '/documentation',
	})
})
