const express = require('express')

const mediaApi = require('../models/media.js')
const userApi = require('../models/user.js')

const mediaRouter = express.Router({mergeParams: true})

mediaRouter.get('/', (req, res) => {
  mediaApi.getAllMedia()
    .then((media) => {
      res.render('media/media', {media})
    })
    .catch ((err) => {
      res.send(err)
    })
})

mediaRouter.get('/new', (req, res) => {
    userApi.getUser(req.params.userId)
        .then((user) => {
            res.render('media/newMediaForm', {user})
        })
})

mediaRouter.post('/', (req, res) => {
    req.body.userId = req.params.userId
        mediaApi.addMedia(req.body)
        .then(() => {
            res.redirect(`/users/${req.params.userId}/media`)
        })
        .catch ((err) => {
            res.send(err)
        })
})

mediaRouter.get('/:mediaId', (req, res) => {
  mediaApi.getMedia(req.params.mediaId)
    .then((media) => {
      res.render('media/singleMedia', {media})
    })
    .catch ((err) => {
      res.send(err)
    })
})

mediaRouter.get('/:mediaId/edit', (req, res) => {
  mediaApi.getMedia(req.params.mediaId)
    .then((media) => {
      res.render('media/editMediaForm', {media})
    })
    .catch ((err) => {
      res.send(err)
    })
})

mediaRouter.put('/:mediaId', (req, res) => {
  mediaApi.updateMedia(req.params.mediaId, req.body)
    .then(() => {
      res.redirect('/media')
    })
    .catch ((err) => {
      res.send(err)
    })
})

mediaRouter.delete('/:mediaId', (req, res) => {
  mediaApi.deleteMedia(req.params.mediaId)
    .then(() => {
      res.redirect('/media')
    })
    .catch ((err) => {
      res.send(err)
    })
})

module.exports = {
  mediaRouter
}