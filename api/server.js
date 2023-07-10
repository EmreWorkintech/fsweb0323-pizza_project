//1.importlarım
const express = require('express');
const server = express();
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');


//2. global middleware'larım
server.use(helmet());
server.use(cors());
server.use(morgan('dev'));


//3. Router'larım
server.get('/', (req,res)=>{
    res.json({message:"Server up and running..."})
})


//4. Error Middleware


//5. export
module.exports = server;



