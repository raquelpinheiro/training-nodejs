'use strict'

const TODOS = ['Task A, Task B, Tas C']

module.exports = async function (fastify, opts) {
  fastify.get('/:id', async (request, reply) => {
    const { id } = request.params
    if (id === null) reply.badRequest()
    reply.send(TODOS)
    await reply
})
}
