module.exports={
userModel:()=>{
    // TO create user schema
db.createCollection("user",{ 
    validator: { 
        $jsonSchema: {
        bsonType: "object",
        required: ["firstname","lastname","mobile","email","password" ],
        properties: {
            firstname: {
                bsonType: "string",
                description: "must be a string"
            },
            lastname: {
                bsonType: "string",
                description: "must be a string"
            },
            mobile: {
                bsonType: "int",
                description: "must be a number and required"
            },
            email: {
                bsonType : "string",
               
                description: "must be a string and match the regular expression pattern"
            },         
            password: {
                bsonType: "string",
                description: "must be a string"
            },
           

        }
    } },
})
}
}