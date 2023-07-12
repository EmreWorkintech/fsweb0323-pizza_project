//1.importlarım
const express = require('express');
const server = express();
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { restricted, checkRole } = require('./Auth/auth-middleware');
const userRouter = require('./Users/users-router')
const authRouter = require('./Auth/auth-router')
const orderRouter = require('./Orders/orders-router')


//2. global middleware'larım
server.use(helmet());        //3rd-party middleware
server.use(cors());
server.use(morgan('dev'));  
server.use(express.json());  //build-in middleware


//3. Router'larım
server.get('/', (req,res)=>{
    res.json({message:"Server up and running..."})
})
server.use('/api/users', restricted, checkRole("Admin"), userRouter);
server.use('/api/auth', authRouter);
server.use('/api/orders', orderRouter);


//4. Error Middleware
server.use((err,req,res,next)=>{
    res
        .status(err.status || 500)
        .json({message: err.message || "Server error!.."})

})

//5. export
module.exports = server;



