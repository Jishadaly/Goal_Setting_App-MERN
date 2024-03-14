const mongoose = require('mongoose')

const adminShema = mongoose.Schema({
 
  name:{
    type : String,
    require : [true , 'please add name']
  },
  email:{
    type : String,
    require : [true , 'please add name'],
    unique : true,
  },
  password:{
    type : String,
    require : [true , 'please add name']
  }

})

module.exports = mongoose.model('Admin' , adminShema);