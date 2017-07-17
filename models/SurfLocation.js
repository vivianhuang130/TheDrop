
const mongoose = require('mongoose')

const surfSchema = new mongoose.Schema ({
  comments: [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  rating: {type: Number},
  location: {type: String}

})

const SurfLocation = mongoose.model('SurfLocation', surfSchema)
module.exports = SurfLocation
