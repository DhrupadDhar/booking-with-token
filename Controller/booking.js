const service = require('../Services')
const responseSend = require('../Lib/responseSend')
var ObjectId = require('mongodb').ObjectID;
async function userBooking(req,res) {
    try{
        let token = await service.userService.verifyTookan(req.headers.authorization,'secretkey');
        console.log("token:"+token);
        
        req.payload.user_id = ObjectId(token)
        let userData = await service.bookingService.createbooking(req,token)
        return responseSend.sendSuccess(req.payload,userData)

    }
    catch(error){
        console.log(error)
        return responseSend.sendError(error);

    }
}

async function getBookingById(req,res){
    try{
    console.log("inside booking service");
    let token = await service.userService.verifyTookan(req.headers.authorization,'secretkey');
    const getData = await service.bookingService.getbooking(token);
    return responseSend.sendSuccess(req.payload,getData)
    }catch(err){
        return responseSend.sendError('Error while getting');
    }
}

module.exports={
    userBooking:userBooking,
    getBookingById:getBookingById
}