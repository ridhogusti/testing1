// global variables
global.express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')

const app = global.express()

app.options('*', cors())
app.use(cors())

app.use(
	bodyParser.json({ limit: '20mb' }),
	bodyParser.urlencoded({
		extended: true,
		limit: '20mb',
		parameterLimit: 20000
	})
)

// Register the route
require('./routes')(app)

// Connection String
require('./config/db');

// Corresponds with an HTTP 404 - the specified resource was not found.
app.use(function(req, res, next) {
	const errorResults = {}

	errorResults.message = 'Sorry, that page does not exist'
	errorResults.code = 34
	return res.status(404).json(errorResults)
})

module.exports = app
