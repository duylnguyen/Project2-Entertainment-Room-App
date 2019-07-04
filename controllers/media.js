const express = require('express')
const mediaApi = require('../models/media.js')
const userApi = require('../models/user.js')
const mediaRouter = express.Router({mergeParams: true})

// mediaRouter.get('/', (req, res) => {   
//     mediaApi.getAllMedia(req.params.mediaId)
//         .then((media) => {
//             res.render('media/media', {userId: req.params.userId, media})
//         })
//         .catch ((err) => {
//             res.send(err)
//         })
// })

// mediaRouter.get('/', (req, res) => {
//     userApi.getUser(req.params.userId)
//         .then((user) => {
//             mediaApi.getAllMedia(req.params.mediaId)
//                 .then((media) => {
//                     res.render('media/media', {user, media})
//                 })
//                 .catch ((err) => {
//                     res.send(err)
//                 })  
//         })
        
// })

// mediaRouter.get('/', (req, res) => {
//     mediaApi.getAllMedia(req.params.mediaId)
//         .then((media) => {
//             res.render('media/media', {media})
//         })
// })

mediaRouter.get('/', (req, res) => {
    userApi.getUser(req.params.userId)
        .then((user) => {
            mediaApi.getMediaByUserId(user._id)
                .then((media) => {
                    res.render('media/media', {user, media})
                })  
        })
        .catch ((err) => {
            res.send(err)
        }) 
})

mediaRouter.get('/movies', (req, res) => {
    userApi.getUser(req.params.userId)
        .then((user) => {
            mediaApi.getMediaByType('Movie') 
                .then((media) => { 
                    res.render('media/movies', {user, media})
                })  
        })
        .catch ((err) => {
            res.send(err)
        }) 
})

mediaRouter.get('/musics', (req, res) => {
    userApi.getUser(req.params.userId)
        .then((user) => {
            mediaApi.getMediaByType('Music') 
                .then((media) => { 
                    res.render('media/musics', {user, media})
                })  
        })
        .catch ((err) => {
            res.send(err)
        }) 
})



// mediaRouter.get('/', async(req, res) => {
//     const user = await userApi.getUser(req.params.userId);
//     const medias = await mediaApi.getMediaByUserId(user._id);
//     const comments = medias.map(async(singleMedia) => {
//     return await commentsApi.getCommectByMediaId(singleMedia._id);
//     })
//         res.render('media/media', {user, media, comments})

mediaRouter.get('/new', (req, res) => {
    userApi.getUser(req.params.userId)
        .then((user) => {
            res.render('media/newMediaForm', {user})
        })
        .catch ((err) => {
            res.send(err)
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
    userApi.getUser(req.params.userId)
        .then((user) => {
            mediaApi.getMedia(req.params.mediaId)
                .then((media) => {
                    res.render('media/singleMedia', {user, media})
                })
        })
        .catch ((err) => {
            res.send(err)
        })
})

mediaRouter.get('/:mediaId/edit', (req, res) => {
    userApi.getUser(req.params.userId)
        .then((user) => {
            mediaApi.getMedia(req.params.mediaId)
                .then((media) => {
                    res.render('media/editMediaForm', {user, media})
                })
        })
        .catch ((err) => {
            res.send(err)
        })
})

mediaRouter.put('/:mediaId', (req, res) => {
    req.body.userId = req.params.userId
        mediaApi.updateMedia(req.params.mediaId, req.body)
            .then(() => {
                res.redirect(`/users/${req.params.userId}/media`)
            })
            .catch ((err) => {
                res.send(err)
            })
})

mediaRouter.delete('/:mediaId', (req, res) => {
    req.body.userId = req.params.userId
        mediaApi.deleteMedia(req.params.mediaId)
            .then(() => {
                res.redirect(`/users/${req.params.userId}/media`)
            })
            .catch ((err) => {
                res.send(err)
            })
})

module.exports = {
  mediaRouter
}