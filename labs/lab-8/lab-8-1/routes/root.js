'use strict'
const { Readable } = require('stream')

module.exports = async function (fastify, opts) {
  const httpErrors = fastify.httpErrors;
  fastify.get('/', async function (request, reply) {
    const {url} = request.query
    if (!request.query)
      throw httpErrors.badRequest()
    try{
      new URL(url)
    }catch(err){
      throw httpErrors.badRequest()
    }
    return reply.from(url, {
      onResponse (request, reply, res){
        reply.send(Readable.from(res))
      }
    })
  })
}
