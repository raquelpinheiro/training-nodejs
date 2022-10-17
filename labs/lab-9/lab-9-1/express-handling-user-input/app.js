'use strict'
var createError = require('http-errors');
var express = require('express');

const app = express()
const router = express.Router()

const { PORT = 3010 } = process.env;

function isParamValid(p) {
  let valid = p !== null && typeof p === 'string';
  return valid;
}

router.get('/', (req, res, next) => {
  if (isParamValid(req.query.un)) {
    setTimeout(() => {
      res.send((req.query.un || '').toUpperCase())
    }, 1000)
  }else{
    res.status(200).send();
  }
})

app.use(router)
app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`)
})

module.exports = app;
