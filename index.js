//const winston = require('winston')
const morgan = require('morgan');
const debug = require('debug')('app:fga')
const express = require('express');
const app = express();

require('./startup/logging')
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()

if (app.get('env') === 'development') {
	app.use(morgan('tiny'))
}

const port = process.env.PORT || 3000
app.listen(port, () => console.log('works'))//winston.info(`Listening on port ${port}`))