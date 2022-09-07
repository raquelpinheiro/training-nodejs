'use strict'

const { Readable, Transform } = require('stream')

function stream(){
    const readable = Readable.from(['this', 'is', 'a', 'stream', 'of', 'data'].map((s) => s + '<br>'))
    const delay = new Transform(({
        transform(chunk, enc, cb) {
            setTimeout(cb, 500, null, chunk)
        }
    }))
    return readable.pipe(delay)
}

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
      reply.type('text/html')
      return stream()
    })
  }