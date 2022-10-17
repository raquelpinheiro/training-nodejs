'use strict'

const proxy = require('@fastify/http-proxy')
const sensible = require('fastify-sensible')

module.exports = async function (fastify, opts) {
  fastify.register(sensible)
  fastify.register(proxy, {
    upstream: 'https://jsonplaceholder.typicode.com/'
  })
}
