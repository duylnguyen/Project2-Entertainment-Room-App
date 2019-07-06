const mongoose = require('./connection.js')

const MediaSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  review: {
    type: String,
    required: true
  },
  posted: {
    type: Date,
    default: Date.now
  },
  userId: {
      type: mongoose.Types.ObjectId
  },
  imgLink: String
})

const MediaCollection = mongoose.model('Media', MediaSchema)

/* Step 4
 *
 * TODO: delete this it's just a sample
 *
 */
function getAllMedia() {
  return MediaCollection.find()
}

function addMedia(media) {
  return MediaCollection.create(media)
}

function getMedia(mediaId) {
  return MediaCollection.findById(mediaId)
}

function updateMedia(mediaId, mediaObject) {
  return MediaCollection.findByIdAndUpdate(mediaId, mediaObject)
}

function deleteMedia(mediaId) {
  return MediaCollection.findByIdAndDelete(mediaId)
}

function getMediaByUserId(userId) {
    return MediaCollection.find({userId: userId})
}

function getMediaByType(mediaType) {
  return MediaCollection.find({type: mediaType})
}

module.exports = {
  getAllMedia,
  addMedia,
  getMedia,
  updateMedia,
  deleteMedia,
  getMediaByUserId,
  getMediaByType
}