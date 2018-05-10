var ObjectId = require('mongodb').ObjectID;

async function createbooking(req,token){
    try{
        const bookingModel = db.collection('booking');
        console.log(req.payload);
        let bookingInsert = await bookingModel.insert(req.payload);
        console.log(bookingInsert)
       return bookingInsert;
    }
    catch(error){
       console.log("error")
        throw error
    }
}

async function getbooking(id)
{  
     const bookingcoll = db.collection('booking');
    try{ 
    let Data = await bookingcoll.aggregate([
        {
            $lookup:{
                from : 'user',
                localField:'user_id',
                foreignField :'_id',
                as: "Book"
            }
        },
        {
             $match : {
                    user_id:ObjectId(id)
             }
         }
    ]).toArray();
    console.log('data passed');
    return Data
}catch(error){
    console.log(error);
    throw error;
}   
}

module.exports={
    createbooking:createbooking,
    getbooking:getbooking
}