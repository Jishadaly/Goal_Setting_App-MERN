const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

  name: {
    type: String,
    require: [true, 'please add name']
  },
  email: {
    type: String,
    require: [true, 'please add name'],
    unique: true,
  },
  password: {
    type: String,
    require: [true, 'please add name']
  },
  profileURL: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: false
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.model('User', userSchema);