const express = require('express')

const commentApi = require('../models/comment.js')

const commentRouter = express.Router()

commentRouter.get('/', (req, res) => {
    commentApi.getAllComments() 
        .then((comments) => {
            res.render('comments/comments', {comments})
        })
        .catch((err) => {
            res.send(err)
        })
})

commentRouter.get('/new', (req, res) => {
    res.render('comments/newCommentForm')
})

commentRouter.post('/', (req, res) => {
    commentApi.addComment(req.body)
        .then(() => {
            res.redirect('/comments')
        })
        .catch((err) => {
            res.send(err)
        })
})

commentRouter.get('/:commentId', (req, res) => {
    commentApi.getComment(req.params.commentId)
        .then((comment) => {
            res.render('comments/comment', {comment})
        })
        .catch((err) => {
            res.send(err)
        })
})

commentRouter.get('/:commentId/edit', (req, res) => {
    commentApi.getComment(req.params.commentId)
        .then((user) => {
            res.render('comments/editCommentForm', {user})
        })
        .catch ((err) => {
            res.send(err)
        })
})

commentRouter.put('/:commentId', (req, res) => {
    commentApi.updateComment(req.params.commentId, req.body)
        .then(() => {
            res.redirect('/comments')
        })
        .catch ((err) => {
            res.send(err)
        })
})

commentRouter.delete('/:commentId', (req, res) => {
    commentApi.deleteComment(req.params.commentId)
        .then(() => {
            res.redirect('/comments')
        })
        .catch ((err) => {
            res.send(err)
        })
})

module.exports = {
    commentRouter
}