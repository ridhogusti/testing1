global.env = require('dotenv').config()
const http = require('http')

const app = require('./app')

// localhost port
const port = normalizePort(process.env.PORT || 3001)

// server instance
const server = http.createServer(app)

// Listen on provide port, on all network interface.
server.on('error', onError)
server.on('listening', onListening)
server.listen(port)

// Normalize a port into a number, string, or false.
function normalizePort(val) {
	var port = parseInt(val, 10)

	if (isNaN(port)) {
		// named pipe
		return val
	}

	if (port >= 0) {
		// port number
		return port
	}

	return false
}

// Event listener for HTTP server "error" event.
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error
	}

	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevasted privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
	}
}

// Event listener for HTTP server "listening" event.
function onListening() {
	var addr = server.address()
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
	console.log(`\n✔ App listening on ${bind}`)
}
