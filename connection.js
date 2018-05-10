async function connection(){
  
    const model= await require('./Model')
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    const url = 'mongodb://localhost:27017';
    
  // Database Name
  const dbName = 'mydb';
  
  
   
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected to database");
   const dbo=client.db(dbName);
    global.db = dbo;
   // created schema
   model.userModel.userModel();
   console.log("User Model Created !!!!")
   model.bookingModel.bookingModel();
   console.log("Booking Model Created !!!!")
  
  });
  
  }
module.exports={
connection:connection
}  