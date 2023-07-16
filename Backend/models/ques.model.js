const mongoose = require('mongoose')

const quesSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        trim:true,
    },
    options:{
        type:[String],
        required:true,
        trim:true
    },
 
    answer:{
        type:[String],
        required:true,
        trim:true
    }
})

const Ques = mongoose.model('Ques',quesSchema)

module.exports ={Ques}
