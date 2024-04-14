import Fastify from 'fastify'
import autoload from '@fastify/autoload'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const fastify = Fastify({
	logger: {
		transport: {
			target: 'pino-pretty',
			options: {
				destination: 1,
				colorize: true,
				translateTime: 'mm-dd-yy HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
	},
})

/**
 * Auto-install plugins
 */
fastify.register(autoload, {
	dir: join(__dirname, 'plugins'),
})

/**
 * Auto-routing
 */
fastify.register(autoload, {
	dir: join(__dirname, 'routes'),
})

try {
	await fastify.listen({ port: 3000 })
} catch (err) {
	fastify.log.error(err)
	process.exit(1)
}

