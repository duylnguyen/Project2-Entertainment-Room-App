/* Step 1 import express
 *
 */
const express = require('express')

/* Step 2
 *
 * Import the api files from the models
 *
 * TODO: change the file path to the models file you'll need to use.
 * TODO: rename this from `templateApi` to something more sensible (e.g:
 * `shopsAPI`)
 *
 * NOTE: You may need to import more than one API to create the 
 * controller you need.
 * 
 */
const movieApi = require('../models/movie.js')

/* Step 3 
 * 
 * Create a new router.
 *
 * the router will "contain" all the request handlers that you define in this file.
 * TODO: rename this from templateRouter to something that makes sense. (e.g:
 * `shopRouter`)
 */
const movieRouter = express.Router()

/* Step 4
 * 
 * TODO: Put all request handlers here
 */

/* Step 5
 *
 * TODO: delete this handler; it's just a sample
 */ 
movieRouter.get('/', (req, res) => {
  movieApi.getAllMovies()
    .then((movies) => {
      res.render('movies/movies', {movies})
    })
    .catch ((err) => {
      res.send(err)
    })
})

movieRouter.get('/new', (req, res) => {
  res.render('movies/newMovieForm')
})

movieRouter.post('/', (req, res) => {
  movieApi.addMovie(req.body)
    .then(() => {
      res.redirect('/movies')
    })
    .catch ((err) => {
      res.send(err)
    })
})

movieRouter.get('/:movieId', (req, res) => {
  movieApi.getMovie(req.params.movieId)
    .then((movie) => {
      res.render('movies/movie', {movie})
    })
    .catch ((err) => {
      res.send(err)
    })
})

movieRouter.get('/:movieId/edit', (req, res) => {
  movieApi.getMovie(req.params.movieId)
    .then((movie) => {
      res.render('movies/editMovieForm', {movie})
    })
    .catch ((err) => {
      res.send(err)
    })
})

movieRouter.put('/:movieId', (req, res) => {
  movieApi.updateMovie(req.params.movieId, req.body)
    .then(() => {
      res.redirect('/movies')
    })
    .catch ((err) => {
      res.send(err)
    })
})


/* Step 6
 *
 * Export the router from the file.
 *
 */
module.exports = {
  movieRouter
}
