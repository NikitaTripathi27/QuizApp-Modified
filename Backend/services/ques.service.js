const {Ques} = require("../models/ques.model")
class QuesService {

    registerQues =async(body)=>{
        console.log(body ,"body")
        const{question , option1 , option2 ,option3 ,option4,answer} =body
        const ques = new Ques({question,option1 ,option2 ,option3 ,option4,answer})
        const newques = await ques.save()
        console.log(newques,'service')
        return newques
    }
    
    getdata = async()=>{
        try{
            const ques = await Ques.find({})
            return ques
            
        }catch(error){
            throw Error(error)
        }
    }
    
    update = async(id ,changes)=>{
        try{
        const updatedUser = await Ques.findOneAndUpdate({_id:id} , changes ,{new:true})
        return updatedUser
        }
        catch(error){
            throw Error(error)
        }
    }

}
module.exports = QuesService