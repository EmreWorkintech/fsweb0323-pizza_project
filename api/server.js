//1.importlarım
const express = require('express');
const server = express();


//2. global middleware'larım



//3. Router'larım
server.get('/', (req,res)=>{
    res.json({message:"Server up and running..."})
})


//4. Error Middleware


//5. export
module.exports = server;



