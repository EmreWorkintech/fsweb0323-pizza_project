const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');
const User = require('../Users/users-model')

const restricted = (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if(token){
            jwt.verify(token, JWT_SECRET, (err,decodedJWT)=>{
                if(!err){
                    req.decodedJWT = decodedJWT;
                    next();
                } else {
                    next(err);
                }
            })
        } else {
            next({status:400, message: "Token required!.."})
        }
    } catch(err) {
        next(err)
    }
}

const generateToken = (user) => {
    const payload = {
        id: user.id,
        role_name: user.role_name,
        name: user.name
    }
    const options = {
        expiresIn: "3h"
    }
    const token = jwt.sign(payload, JWT_SECRET, options)
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


module.exports = {
    restricted,
    generateToken,
    checkRole,
    isEmailAvailable
}