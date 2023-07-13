const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const User = require('../Users/users-model');
const redis = require('redis');
const client = redis.createClient();

async function connection(){
    await client.connect();
}
connection();

const restricted = async (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(token){
            const tokenValue = await client.get(token);
            if(tokenValue) {
                jwt.verify(token, JWT_SECRET, (err,decodedJWT)=>{
                    if(!err){
                        req.decodedJWT = decodedJWT;
                        next();
                    } else {
                        next(err);
                    }
                })
            } else {
                next({status:403, message: "Token is expired!.."})
            }
            
        } else {
            next({status:400, message: "Token required!.."})
        }
    } catch(err) {
        next(err)
    }
}

const generateToken = async (user) => {
    const payload = {
        id: user.id,
        role_name: user.role_name,
        name: user.name
    }
    const options = {
        expiresIn: "3h"
    }
    const token = jwt.sign(payload, JWT_SECRET, options);
    await client.set(token, 1, {EX: 60*60*3})  //3 saat olarak expire süresi verdik
    return token;
}

const checkRole = (role) => (req,res,next) => {
    if(req.decodedJWT.role_name === role) {
        next()
    } else {
        next({status:403, message: "Buraya giriş izniniz yok!.."})
    }
}

const isEmailAvailable = async (req,res,next)=> {
    const user = await User.getByEmail(req.body.email);
    if(!user) {
        next()
    } else {
        next({status:400, message: "Email is not available!.."})
    }
}

const logout = async (req,res,next)=> {
    try {
        const token = req.headers.authorization;
        await client.del(token);
        next();
    } catch(err) {
        next(err)
    }
}
module.exports = {
    restricted,
    generateToken,
    checkRole,
    isEmailAvailable,
    logout
}