const  mongoose = require('mongoose');

const connectDb = async()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log('db Connected'))
    .catch((err)=>console.log("Error",err))
}

module.exports = { connectDb }