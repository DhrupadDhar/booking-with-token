const Controller = require('../Controller')
const Joi = require('joi')

module.exports=[
    //Get all user details 
    {
   
        path:'/find',
        method:'GET',
        handler:Controller.userController.getall
    },
    //Get user details with email
     
{
         path:'/findone',
        method:'POST',
        handler:Controller.userController.userDetail,
        config:{
            tags:['api'],
            validate: {
                payload: {
                    email: Joi.string().required()
                }
            }
        }
       
},

     //Sign up function for user
{
        path:'/signup',
        method:'POST',
        handler:Controller.userController.signup,
       config:{
           tags:['api'],
        validate: {
            payload:{
                firstname: Joi.string().required(),
                lastname: Joi.string().required(),
                mobile: Joi.number().required(),
                email: Joi.string().email().required(),
                password: Joi.string().required()
                
            }
        }
    }
     },
    
     //Login function for user
    
   {
        path:'/login',
        method:'POST', 
        handler:Controller.userController.loginuser,
        config:{
            tags:['api'],
            validate: {
                payload: {
                    // _id : Joi.string().required(),
                     email: Joi.string().required(),
                     password: Joi.string().required()
                  }
            }
         
       }
    }
]