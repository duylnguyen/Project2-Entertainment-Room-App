const express = require('express')
const mediaApi = require('../models/media.js')
const userApi = require('../models/user.js')
const homeRouter = express.Router({mergeParams: true})

homeRouter.get('/', (req, res) => {
    userApi.getUser(req.params.userId)
        .then((user) => {
            mediaApi.getAllMedia(req.params.mediaId)
                .then((media) => {
                    res.render('media/allMedia', {user, media})
                })
                .catch ((err) => {
                    res.send(err)
                })  
        })      
})

module.exports = {
    homeRouter
  }