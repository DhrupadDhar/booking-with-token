const service = require('../Services')
const responseSend = require('../Lib/responseSend')
const Boom = require('boom')

//to create a user
async function signup(req,res){
    try {
     
        let userData= await service.userService.Checkmail(req);
       console.log(userData)
        if(userData==null){
            const User = await service.userService.createUser(req);
           global.User=User
        }
        else
        {
           return Boom.badRequest("User Already Exist")
        }
    return responseSend.sendSuccess(req.payload,User)
    }
     catch (error) {
        return responseSend.sendError(error);
    }

}
// get all user details
async function getall(){
    try {

        const userData = await service.userService.getUsers();
        return {statusCode:200,Message:"get data",data:userData}
       

    } catch (error) {
        return responseSend.sendError(error);

    }
}
// To get details of a user by email
async function userDetail(req){
    try {

        const userData = await service.userService.getByemail(req.payload.email);
        return responseSend.sendSuccess(req.payload,userData)

    } catch (error) {
        return responseSend.sendError(error);

    }
}

async function loginuser(req){
    try {
      const userData = await service.userService.login(req);      
      return responseSend.sendSuccess(req.payload,userData)

    } catch (error) {
        return responseSend.sendError(error);

    }

}


module.exports = {
    
    signup:signup,
    getall:getall,
    userDetail:userDetail,
    loginuser:loginuser,
  
}