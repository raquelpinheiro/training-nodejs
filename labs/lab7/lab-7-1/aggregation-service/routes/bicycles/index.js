'use strict'

const got = require('got')

let BICYCLE_SERVICE_PORT = 57743
let BRAND_SERVICE_PORT = 57747

let bicycleAddress = `http://localhost:${BICYCLE_SERVICE_PORT}`
let brandAddress = `http://localhost:${BRAND_SERVICE_PORT}`

module.exports = async (fastify, opts) => {
  const { httpErrors } = fastify.httpErrors
  fastify.get('/:id', async (request, reply) => {
        try{
          let id = request.params.id
          const [bicycle, brand] = await Promise.all([
            got(`${bicycleAddress}/color/${id}`).json(),
            got(`${brandAddress}/${id}`).json()
          ])
          return {
            id: bicycle.id,
            color: bicycle.color,
            brand: brand.name
          }
        }catch(err){
          if (!err.response) throw err
          if (err.response.statusCode === 503 || err.statusCode == 401 ||
              err.response.statusCode == 403 || err.statusCode == 405 ||
              err.response.statusCode == 499){
                throw httpErrors.badRequest();
              }
          if (err.response.statusCode === 400)
              throw httpErrors.badRequest()
          if (err.response.statusCode === 404)
              throw httpErrors.notFound()

          throw err
        }
  })
}
