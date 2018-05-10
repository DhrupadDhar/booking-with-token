module.exports={
    bookingModel:()=>{
db.createCollection("booking",{
    validator:{
        $jsonSchema:{
            bsonType:['object'],
            required:["user_id","seat","address"],
            properties:{
                user_id:{
                    bsonType:"objectId"
                },
                seat:{
                     bsonType:"int",
                     minimum:0,
                     maximum:5,
                     exclusiveMaximum:false,
                     description:"must be integer in [0,5] and is required"
                 },
                 address:{
                     bsonType: ["object"],
                     minItems:1,
                     maxItems:10,
                     items:{
                         //bsonType:["object"],
                         required:["latitude","longitude"],
                         properties:{
                             latitude:{
                                 bsonType:["string"],
                                 description:"must be in string"
                             },
                             longitude:{
                                 bsonType:["string"],
                                 description:"must be required and of doble or decimal type"
                             }
                         }
                     }
                 }
                 
                  
            }
        }
    }
});

}
}