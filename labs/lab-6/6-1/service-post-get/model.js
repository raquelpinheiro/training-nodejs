'use strict'

module.exports = {
    sneakers: sneakersModel()
}

function sneakersModel(){
    const db = {
        1 : { brand: 'Nike', color: 'red' },
        2 : { brand: 'Puma', color: 'blue' }
    }

    return {
        uid,
        create,
        read,
        update,
        delete: del
    }

    function uid(){
        return Object.keys(db).sort((a, b) => a - b).map(Number).filter((n) => !isNaN(n)).pop() + 1 + ''
    }

    function create(id, data, cb){
        if (db.hasOwnProperty(id)){
            const err = Error('resource exists')
            err.code = 'E_RESOURCE_EXISTS'
            cb(err)
            return
        }
        db[id] = data
        cb(null, id)
    }

    function read(id, cb){
        if (!(db.hasOwnProperty(id))){
            const err = Error('not found')
            err.code = 'E_NOT_FOUND'
            cb(err)
            return
        }
        cb(null, db[id])
    }

    function update(id, cb){
        if (!(db.hasOwnProperty(id))){
            const err = Error('not found')
            err.code = 'E_NOT_FOUND'
            cb(err)
            return
        }
        db[id] = data
        cb()
    }

    function del(id, cb){
        if (!(db.hasOwnProperty(id))){
            const err = Error('not found')
            err.code = 'E_NOT_FOUND'
            cb(err)
            return
        }
        delete db[id]
        cb()
    }
}