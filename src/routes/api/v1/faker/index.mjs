/** @type { import('fastify').FastifyPluginAsync<{}> } */

import { fakerRU as faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { writeToBuffer } from '@fast-csv/format'

export default (async(fastify, _opts) => {
	fastify.post(
		'/generate-csv',
		{
			schema: {
				description: 'generate random .csv table',
				tags: ['faker'],
			},
		},
		async function handler(request, reply) {
			const count = request.body?.count ?? 100
			const rows = []

			for (let i = 0; i < count; i++) {
				rows.push([
					`+7${faker.phone.number()}`,
					faker.person.firstName(),
					faker.person.lastName(),
					faker.company.name(),
					dayjs(faker.date.birthdate({ min: 18, max: 65, mode: 'age' }))
						.format('DD.MM.YYYY'),
				])
			}

			const rowsBuffer = await writeToBuffer(rows)

			try {
				reply
					.header('Content-Type', 'text/csv')
					.header('Content-Disposition', `attachment; filename="faker-csv-${Date.now()}.csv"`)
					.send(rowsBuffer)
			} catch (err) {
				fastify.log.error(err)
				throw new Error(`🦕 Something went wrong\n ${err}`)
			}
		},
	)
})
