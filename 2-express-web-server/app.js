'use strict'
const express = require('express')
const createError = require('http-errors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const helloRoutes = require('./routes/hello')
var indexViewRoutes = require('./routes/index');
var helloViewRouter = require('./routes/hello-view');
var articlesRouter = require('./routes/articles');

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV !== 'production'){
  app.use(express.static(path.join(__dirname, 'public')));  
}

app.use('/', indexViewRoutes)
app.use('/hello', helloRoutes)
app.use('/hello-view', helloViewRouter)
app.use('/articles', articlesRouter);

app.use((req, res, next) => {
	if (req.method !== 'GET'){
	  next(createError(405))
	  return
	}
	next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
	// render the error page
	res.status(err.status || 500);
	res.render('error');
  });

module.exports = app

