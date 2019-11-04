/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

/**
  * Issues a mongodb findAndModify update command.
  * Finds a matching document, updates it according to the update arg,
    passing any options,
  * and returns the found document (if any) to the callback. The query
    executes immediately
  * if callback is passed else a Query object is returned.
  *Recently updated in the mongoose docs link here https://mongoosejs.com/docs/deprecations.html for these deprecation where mentioned.
*/

// Build the connection string
const dbURI =
  "mongodb+srv://admin:admin@development-ohijf.mongodb.net/example?retryWrites=true&w=majority";
const db = mongoose.connection;

const options = {
  // useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  keepAlive: true
};

// Create the database connection
mongoose.connect(dbURI, options);
mongoose.Promise = global.Promise;

// CONNECTION EVENTS
// When successfully connected
db.on(
  "connected",
  console.log.bind(
    console,
    `✔ Mongoose default connection open to database dev`
  )
);

// If the connection throws an error
db.on(
  "error",
  console.error.bind(console, "Mongoose default connection error")
);

// When the connection is disconnected
db.on(
  "disconnected",
  console.log.bind(console, "Mongoose default connection disconnected")
);

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", () => {
  db.close(() => {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
