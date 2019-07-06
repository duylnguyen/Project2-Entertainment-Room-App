const express = require('express')
const commentApi = require('../models/comment.js')
const mediaApi = require('../models/media.js')
const commentRouter = express.Router({mergeParams: true})

commentRouter.get('/', (req, res) => {
    mediaApi.getMedia(req.params.mediaId)
        .then((media) => {
            commentApi.getCommentByMedia(media._id)
                .then((comments) => {
                    res.render('comments/comments', {media, comments})
                }) 
        })
        .catch((err) => {
            res.send(err)
        })
})

commentRouter.get('/new', (req, res) => {
    mediaApi.getMedia(req.params.mediaId)
        .then((media) => {
        res.render('comments/newCommentForm', {media})
        })
        .catch((err) => {
            res.send(err)
        })
})

commentRouter.post('/', (req, res) => {
    req.body.mediaId = req.params.mediaId
        commentApi.addComment(req.body)
            .then(() => {
                res.redirect(`/media/${req.params.mediaId}/comments`)
            })
            .catch((err) => {
                res.send(err)
            })
})

commentRouter.get('/:commentId', (req, res) => {
    mediaApi.getMedia(req.params.mediaId)
        .then((media) => {
            commentApi.getComment(req.params.commentId)
                .then((comment) => {
                    res.render('comments/comment', {media, comment})
                })
        })
        .catch((err) => {
            res.send(err)
        })
})

commentRouter.get('/:commentId/edit', (req, res) => {
    mediaApi.getMedia(req.params.mediaId)
        .then((media) => {
            commentApi.getComment(req.params.commentId)
                .then((comment) => {
                    res.render('comments/editCommentForm', {media, comment})
                })
        })  
        .catch ((err) => {
            res.send(err)
        })
})

commentRouter.put('/:commentId', (req, res) => {
    req.body.mediaId = req.params.mediaId
        commentApi.updateComment(req.params.commentId, req.body)
            .then(() => {
                res.redirect(`/media/${req.params.mediaId}/comments`)
            })
            .catch ((err) => {
            res.send(err)
            })
})

commentRouter.delete('/:commentId', (req, res) => {
    req.body.mediaId = req.params.mediaId
        commentApi.deleteComment(req.params.commentId)
            .then(() => {
                res.redirect(`/media/${req.params.mediaId}/comments`)
            })
            .catch ((err) => {
                res.send(err)
            })
})

module.exports = {
    commentRouter
}