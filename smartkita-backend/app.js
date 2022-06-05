// dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const history = require('connect-history-api-fallback');


const indexRouter = require('./routes/index');
const kitasRouter = require('./routes/kitas');
const applicationsRouter = require('./routes/applications');
const childrenRouter = require('./routes/children');
const contractsRouter = require('./routes/contracts');
const guardiansRouter = require('./routes/guardians');
const imagesRouter = require('./routes/images');
const documentsRouter = require('./routes/documents');
const employeesRouter = require('./routes/employees');
const eventRouter = require('./routes/events');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware functions (have access to req, res, next)
app.use(logger('dev'));
app.use(cors({
  origin: 'http://localhost:3000'
}))
// ff: body-parser-like functions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// serve Vue frontend
app.use(history());
app.use(express.static(path.join(__dirname, "../smartkita-frontend/dist")));
/*app.get('/', function (req,res) {
  res.sendFile(path.join(__dirname, "../smartkita-frontend/dist/index.html"));
});*/
/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../smartkita-frontend/dist/index.html'));
});*/

// app.use('/', indexRouter);
app.use('/kitas', kitasRouter);
app.use('/applications', applicationsRouter);

// the following routes currently only contain dummy methods:
app.use('/children', childrenRouter);
app.use('/contracts', contractsRouter);
app.use('/guardians', guardiansRouter);
app.use('/images', imagesRouter);
app.use('/documents', documentsRouter);
app.use('/employees', employeesRouter);

// event route
app.use('/events', eventRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// custom middleware (err argument) => must be defined last in order
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
