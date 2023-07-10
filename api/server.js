//1.importlarım
const express = require('express');
const server = express();
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');


//2. global middleware'larım
server.use(helmet());        //3rd-party middleware
server.use(cors());
server.use(morgan('dev'));  
server.use(express.json());  //build-in middleware


//3. Router'larım
server.get('/', (req,res)=>{
    res.json({message:"Server up and running..."})
})


//4. Error Middleware
server.use((err,req,res,next)=>{
    res
        .status(err.status || 500)
        .json({message: err.message || "Server error!.."})

})

//5. export
module.exports = server;



