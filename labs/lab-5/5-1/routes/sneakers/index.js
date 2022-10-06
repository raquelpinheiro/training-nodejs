'use strict'

const { sneakers } = require('../../model')

module.exports = async (fastify, opts) => {
    fastify.get('/:id', async (req, res) => {
        sneakers.read(req.params['id'], (err, result) => {
            if (err){
                if (err.code === 'E_NOT_FOUND') res.notFound()
                else res.send(err)
            }else res.send(result)
        })
        await res
    })
}