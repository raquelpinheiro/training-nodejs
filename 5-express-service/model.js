'use strict'

module.exports = {
  bicycle: bicycleModel()
}

function bicycleModel() {
  const db = {
    1: { brand: 'Veloretti', color: 'green' },
    2: { brand: 'Batavus', color: 'yellow' }
  }

  return {
    uid,
    create,
    read,
    update,
    del
  }

  function uid() {
    return Object.keys(db).sort((a, b) => a - b).map(Number).filter((n) => !isNaN(n)).pop() + 1 + ''
  }

  function create(id, data, cb) {
    if (db.hasOwnProperty(id)) {
      const err = Error('resource exists')
      err.code = 'E_RESOURCE_EXISTS'
      cb(err)
      return
    }
    db[id] = data
    cb(null, id)
  }

  function read(id, cb) {
    if (!(db.hasOwnProperty(id))) {
      const err = Error('not found')
      err.code = 'E_NOT_FOUND'
      cb(err)
      return
    }
    setImmediate(() => cb(null, db[id]))
  }

  function update(id, data, cb) {
    if (!(db.hasOwnProperty(id))) {
      const err = Error('not found')
      err.code = 'E_NOT_FOUND'
      cb(err)
      return
    }
    db[id] = data
    cb()
  }

  function del(id, cb) {
    if (!(db.hasOwnProperty(id))) {
      const err = Error('not found')
      err.code = 'E_NOT_FOUND'
      Cb(err)
      return
    }
    delete db[id]
    cb()
  }
}