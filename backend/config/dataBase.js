const mongoose = require('mongoose')

const connectDB = async()=>{
  try {
    console.log(process.env.dbURI);
    const connect = await mongoose.connect(process.env.dbURI)
    console.log(`mongoDB connected ${connect}`);
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
}

module.exports = connectDB