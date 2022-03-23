const Server = require('./models/server');

require('dotenv').config();

console.log(process.env.PORT)

const server = new Server();


server.listen();