const jwt = require('jsonwebtoken')
const Boom = require('boom')
const ResponseSend = require('../Lib/responseSend')
var ObjectId = require('mongodb').ObjectID;

async function Checkmail(req,res){
    const coll=  db.collection('user')
    try {
        const emailData = await  coll.findOne({email:req.payload.email});
        // if(emailDataCheck == null){
        //     return emailDataCheck
        // } else {
        //    console.log("Email Exist") 
        // }
        //console.log(emailData)
        return emailData

    } catch (error) {
        throw error;
    }
}

async function getUsers(){
    const coll=  db.collection('user')
    try {
       
        const userData = await coll.find({}).toArray();
        return userData;
    } catch (error) {
        throw error;
    }
}
async function getByemail(email, callback){
    const coll=  db.collection('user')
    try {
       
        const userData = await coll.findOne({email:email});

        if(userData == null){
            throw "Not Found"
        } else {
            return userData
        }

    } catch (error) {
        throw error;
    }
}

async function createUser(data, callback){
    try {
        const coll=  db.collection('user')
        
        let userdetail=
            {   firstname: data.payload.firstname,      
                lastname:data.payload.lastname,
                mobile:data.payload.mobile,
                email: data.payload.email,
                password:data.payload.password
           }
        const Insert = await coll.insert(userdetail)
        const  UD= {
            firstname:Insert.ops[0].firstname,
            lastname:Insert.ops[0].lastname,
            email:Insert.ops[0].email,
            mobile:Insert.ops[0].mobile
        }
        return UD
      } catch (error) {
          console.log(error);
        throw error;
      }
}



async function login(req, res){
    const coll =  db.collection('user')
    try {
        const userData = await  coll.findOne({$and:[{email:req.payload.email}, {password: req.payload.password}]});
        console.log(userData)
        const UD = {
            _id:userData._id,
            firstname:userData.firstname,
            lastname:userData.lastname,
            email:userData.email,
            mobile:userData.mobile
        }
        if(UD == null){
            throw "User Not Found"
        } else {

            //console.log("Login Succesfully "+req)
            const tkn = {
                _id: UD._id
            }
            let token = jwt.sign(tkn,'secretkey')
            UD.token=token
              return UD
        }

    } catch (error) {
        throw error;
    }
}

async function verifyTookan(req,res){
    try{console.log(req+ res)
        const decode= await jwt.verify(req,res)
       console.log(decode._id);
       return decode._id;
        

    }
    catch(error)
    {
        return Boom.unauthorized("You are not authorised")
    }
} 

module.exports = {
  
    createUser: createUser,
    Checkmail: Checkmail,
    getUsers:getUsers,
    getByemail:getByemail,
          login:login,
    verifyTookan:verifyTookan
   
}