const mogoose = require('./connection.js')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const UserCollection = mongoose.model('User', UserSchema)

function getAllUsers() {
    return UserCollection.find()
}

function addUser(user) {
    return UserCollection.create(user)
}

function getUser(userId) {
    return UserCollection.findById(userId)
}

function updateUser(userId, userObject) {
    return UserCollection.findByIdAndUpdate(userId, userObject)
}

function deleteUser(userId) {
    return UserCollection.findByIdAndDelete(userId)
}

module.exports = {
    getAllUsers,
    addUser,
    getUser,
    updateUser,
    deleteUser
}