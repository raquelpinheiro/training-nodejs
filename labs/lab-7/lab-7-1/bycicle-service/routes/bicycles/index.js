'use strict'

const colors = ['Yellow', 'Red', 'Orange', 'Green', 'Blue', 'Indigo']

module.exports = async function (fastify, opts) {

    const { badRequest, notFound } = fastify.httpErrors

    fastify.get('/color/:id', async function (request, reply) {
        let id = request.params.id;
        if (id === null || isNaN(id))
            throw badRequest()

        if (!colors[id])
            throw notFound()
        
        reply.status(200)
        reply.send({id: id, color: colors[id]})
        await reply
    })
}