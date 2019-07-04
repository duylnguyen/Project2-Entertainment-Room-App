// Import the mongoose module
const mongoose = require('mongoose');

// Name Mongo database
const connectionString = process.env.MONGODB_URI || "mongodb://localhost/Entertainment-Room";

// Open up a connection to the mongo database.
mongoose.connect(connectionString, { useNewUrlParser: true})
  .then(() => {
    console.log("connected to mongo at: " + connectionString);
  });

// Export the mongoose object.
module.exports = mongoose
