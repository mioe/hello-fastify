/** @type { import('fastify').FastifyPluginAsync<{}> } */

const routes = async(fastify, _opts) => {
	fastify.get(
		'/',
		{
			schema: {
				description: 'hello world',
				tags: ['core'],
				response: {
					default: {
						description: 'response hello world',
						type: 'object',
						properties: {
							hello: { type: 'string' },
						},
					},
				},
			},
		},
		async function handler(_request, _reply) {
			return { hello: 'world' }
		},
	)
}

export default routes
