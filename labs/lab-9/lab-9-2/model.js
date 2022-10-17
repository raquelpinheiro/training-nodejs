'use strict'

module.exports = {
    boat: boatModel()
}

function boatModel() {
    const dataBase = {
        1: { brand: 'Yamaha', color: 'black and write' },
        2: { brand: 'Gazin', color: 'blue and write' }
    }

    function* uid() {
        let id = 0;
        while (true) {
            id++;
            yield id;
        }
    }

    function create(id, data, cb) {
        if (dataBase.hasOwnProperty(id)) {
            const err = new Error('Resource alread exists');
            err.code = 'E_RESOURCE_EXISTS';
            cb(err);
            return;
        }
        dataBase[id] = data;
        cb(null, id);
    }

    function read(id, cb) {
        if (!(dataBase.hasOwnProperty(id))) {
            const err = new Error('Resource not exists');
            err.code = 'E_RESOURCE_NOT_EXISTS';
            cb(err);
            return;
        }
        cb(null, dataBase[id]);
    }

    function del(id, cb) {
        if (!(db.hasOwnProperty(id))) {
            const err = Error('not found')
            err.code = 'E_NOT_FOUND'
            cb(err)
            return
        }
        delete db[id]
        cb()
    }

    return {
        uid,
        create,
        read,
        del
    }
}