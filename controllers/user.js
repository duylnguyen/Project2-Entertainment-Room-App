const express = require('express')

const userApi = require('../models/user.js')

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
    userApi.getAllUsers() 
        .then((users) => {
            res.render('users/users', {users})
        })
        .catch((err) => {
            res.send(err)
        })
})

userRouter.get('/new', (req, res) => {
    res.render('users/newUserForm')
})

userRouter.post('/', (req, res) => {
    userApi.addUser(req.body)
        .then(() => {
            res.redirect('/users')
        })
        .catch((err) => {
            res.send(err)
        })
})

userRouter.get('/:userId', (req, res) => {
    userApi.getUser(req.params.userId)
        .then((user) => {
            res.render('users/user')
        })
        .catch((err) => {
            res.send(err)
        })
})

module.exports = {
    userRouter
}