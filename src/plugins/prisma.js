import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'

export default fp(async(server, _opts) => {
	const prisma = new PrismaClient()
	await prisma.$connect()

	// Make Prisma Client available through the fastify server instance: server.prisma
	server.decorate('prisma', prisma)
	server.addHook('onClose', async(server) => {
		await server.prisma.$disconnect()
	})
})
