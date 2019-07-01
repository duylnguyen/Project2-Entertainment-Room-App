const mongoose = require('./connection.js')

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    }
})

const CommentCollection = mongoose.model('Comment', CommentSchema)

function getAllComments() {
    return CommentCollection.find()
}

function addComment(comment) {
    return CommentCollection.create(comment)
}

function getComment(commentId) {
    return CommentCollection.findById(commentId)
}

function updateComment(commentId, commentObject) {
    return CommentCollection.findByIdAndUpdate(commentId, commentObject)
}

function deleteComment(commentId) {
    return CommentCollection.findByIdAndDelete(commentId)
}

module.exports = {
    getAllComments,
    addComment,
    getComment,
    updateComment,
    deleteComment
}