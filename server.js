const Routes = require('./Routes') 
const Hapi = require('hapi')
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const db = require('./connection')

const server=Hapi.server({
    host:'localhost',
    port:'4000'
})
const swaggerOptions = {
    info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
    };

 server.register([
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: swaggerOptions
    }
]);
server.route(Routes.userRoutes)
server.route(Routes.bookingRoutes)
async function start() {
    try {
        global.database = await db.connection()

       await server.start();
       console.log(`The server is started at :${server.info.uri}`)

    } catch (err){
        console.log(err)
    }

}
start();