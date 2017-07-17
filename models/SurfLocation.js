const mongoose = require('mongoose')

<<<<<<< HEAD
// const surfSchema = new mongoose.Schema ({
//   comments: [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
//   rating: {type: Number},
//   location:
//
// })
//
// const SurfLocation = mongoose.model('SurfLocation', surfSchema)
// module.exports = SurfLocation
=======
const surfSchema = new mongoose.Schema ({
  comments: [{type:mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  rating: {type: Number},
  location: {type: String}

})

const SurfLocation = mongoose.model('SurfLocation', surfSchema)
module.exports = SurfLocation
>>>>>>> ecc1d054579c5248ed0eec90e4113a61e0323e73
