const controller = require('../Controller')
const Joi=require('joi')
module.exports=[
    {
        path:'/createbooking',
        method:'POST',
        handler: async function(req, res) {
            try{
                const response = await controller.bookingController.userBooking(req)
                return response
            }
            catch(error)
            {
                console.log(error);
                throw error
            }
            
        },
        config:{
            tags:['api'],
            validate:{
                payload:{
                        seat: Joi.number().required(),
                         address: Joi.object().keys({
                            latitude: Joi.string().required(),
                            longitude: Joi.string().required()
                        })
                    
                },
                headers:Joi.object({
                    'authorization':Joi.string().required()
                }).unknown()
            }
        }
    },
    {
        path : '/getbooking',
        method : 'POST',
        config:{
            tags:['api'],
            validate:{
                headers:Joi.object({
                    'authorization':Joi.string().required()
                }).unknown()
            }
        },
        async handler(req,res){
            try{
            const response = await controller.bookingController.getBookingById(req)
            return response
            }catch(error){
                throw error;
            }
        }
    },   

]