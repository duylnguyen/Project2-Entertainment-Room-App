/* 
 * Place all functions, classes, and/or DB schemas here for a single 
 * model.
 */

/* Step 1
 *
 * TODO: import mongoose connection
 * NOTE: skip this if you are not using mongoose
 *
 */
const mongoose = require('./connection.js')

/* Step 1 alternative
 *
 * TODO: make a global variable to act as an in memory database. 
 * NOTE: doing this WILL NOT persist your data and you will loose
 * your data once you stop running your server.
 *
 */

/* Step 2
 *
 * TODO: create model schema 
 * NOTE: skip this if you are not using mongoose
 *
 */
const MovieSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  review: {
    type: String,
    required: true
  },
  imgLink: String,
})

/* Step 3
 *
 * TODO: create collection API
 * NOTE: skip this if you are not using mongoose
 *
 */
const MovieCollection = mongoose.model('Movie', MovieSchema)

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
function getAllMovies() {
  return MovieCollection.find()
}

function addMovie(movie) {
  return MovieCollection.create(movie)
}

function getMovie(movieId) {
  return MovieCollection.findById(movieId)
}

function updateMovie(movieId, movieObject) {
  return MovieCollection.findByIdAndUpdate(movieId, movieObject)
}

function deleteMovie(movieId) {
  return MovieCollection.findByIdAndDelete(movieId)
}

/* Step 5
 *
 * TODO: export all functions from this file by adding their names as keys to this
 * object
 */
module.exports = {
  getAllMovies,
  addMovie,
  getMovie,
  updateMovie,
  deleteMovie
}
