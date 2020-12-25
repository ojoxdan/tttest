const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongooseURI')

const connectDB = async () =>{
    try {        
       await mongoose.connect(db,{
            useCreateIndex:true,
            useFindAndModify:false,
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        console.log('Mongo DB connected')
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = connectDB