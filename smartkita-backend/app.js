// dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const history = require('connect-history-api-fallback');

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


// middleware functions (have access to req, res, next)
app.use(logger('dev'));
app.use(cors({
  origin: 'http://localhost:3000'
}))
// ff: body-parser-like functions
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
app.use('/api/kitas', kitasRouter);
app.use('/api/applications', applicationsRouter);

// the following routes currently only contain dummy methods:
app.use('/api/children', childrenRouter);
app.use('/api/contracts', contractsRouter);
app.use('/api/guardians', guardiansRouter);
app.use('/api/images', imagesRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/employees', employeesRouter);

// event route
app.use('/api/events', eventRouter);

// serve Vue frontend
app.use(history());
app.use(express.static(path.join(__dirname, "../smartkita-frontend/dist")));

module.exports = app;
