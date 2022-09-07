'use strict'

const dts = require('../data')

/*
module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    reply.status(200)
    return dts.data
  })
}
*/

module.exports = async function (fastify, opts){
  fastify.get('/', async function(request, reply){
    const { greeting = 'Hello ' } = request.query
    return reply.view(`hello.hbs`, { greeting })
  })
}