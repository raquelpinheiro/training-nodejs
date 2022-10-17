'use strict'
const { promisify } = require('util')
const { boat } = require('../../model')
const { id } = boat
const read = promisify(boat.read)
const create = promisify(boat.create)
const del = promisify(boat.del)

module.exports = async (fastify, opts) => {
    const { notFound } = fastify.httpErrors
    const dataSchema = {
        type: 'object',
        required: ['brand', 'color'],
        additionalProperties: false,
        properties: {
            brand: { type: 'string' },
            color: { type: 'string' }
        }
    }
    const bodySchema = {
        type: 'object',
        required: ['data'],
        additionalProperties: false,
        properties: {
            data: dataSchema
        }
    }
    const idSchema = { type: 'integer' }
    const paramsSchema = { id: idSchema }

    fastify.get('/:id',
        {
            schema: {
                params: paramsSchema,
                response: {
                    200: dataSchema
                }
            }
        },
        async (request, reply) => {
            const { id } = request.params
            try {
                return await read(id)
            } catch (err) {
                if (err.code === 'E_RESOURCE_NOT_EXISTS'){
                    throw notFound()
                }
                throw err
            }
        })

    fastify.post('/',
        {
            schema: {
                body: bodySchema,
                response: {
                    201: {
                        id: idSchema
                    }
                }
            }
        },
        async (request, reply) => {
            const { data } = request.body
            const id = id.uid().next()
            await create(id, data)
            reply.code(201)
            return { id }
        })

    fastify.delete('/:id',
        {
            schema: {
                params: paramsSchema
            }
        },
        async (request, reply) => {
            const { id } = request.params
            try {
                await del(id)
                reply.code(204)
            } catch (err) {
                if (err.message === 'not found') throw notFound()
                throw err
            }
        })
}