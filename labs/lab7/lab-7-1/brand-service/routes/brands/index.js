'use strict'

const brands = ['Gazelle', 'Batavus', 'Azor', 'Cortina', 'Giant', 'Sparta']

module.exports = async (fastify, opts) => {

    const { notFound, badRequest } = fastify.httpErrors

    fastify.get('/:id', async (request, reply) => {
        let id = request.params.id
        if (id === null || isNaN(id))
            throw badRequest('Parametro invalido')

        if (!brands[id])
            throw notFound()

        reply.code(200);
        reply.send({ id: id, name: brands[id] })
        await reply
    })
}
