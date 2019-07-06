const mongoose = require('./connection.js')

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    posted: {
        type: Date,
        default: Date.now
    },
    mediaId: {
        type: mongoose.Types.ObjectId
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

function getCommentByMedia(mediaId) {
    return CommentCollection.find({mediaId: mediaId})
}

module.exports = {
    getAllComments,
    addComment,
    getComment,
    updateComment,
    deleteComment
}