const quesService = require('../services/ques.service')
const quesServiceInstance = new quesService()
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError')
const quesRegister = async(req ,res) =>{
    console.log(req.body)
    try{
    const user = await quesServiceInstance.registerQues(req.body);
    console.log('user',user)
    res.status(httpStatus.OK).json(user);
    }
    catch(error){
        throw new ApiError(httpStatus.BAD_REQUEST,"not created")
    }
}

const getQuestion =async(req,res)=>{
    try{
        console.log("in controller")
    const ques = await quesServiceInstance.getdata()
    res.status(httpStatus.OK).json(ques)
    }catch(error){
        throw new ApiError(httpStatus.BAD_REQUEST,"cannot get ")
    }
    
}

const quesAmmend =async(req ,res)=>{
    console.log(req.body);
    const{id} =req.params
    try{
        const user = await quesServiceInstance.update(id ,req.body)
        res.status(httpStatus.OK).json(user)
    }catch(error){
        throw new ApiError(httpStatus.BAD_REQUEST , "not deleted")
    }
}

module.exports ={quesRegister,quesAmmend ,getQuestion}