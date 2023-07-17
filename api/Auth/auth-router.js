const router = require('express').Router();
const User = require('../Users/users-model');
const bcypt = require('bcryptjs');
const { HASH_ROUND } = require('../../config');
const { generateToken, isEmailAvailable, restricted, logout } = require('./auth-middleware');
const { payloadCheck } = require('../Users/users-middleware');

router.post('/register', payloadCheck, isEmailAvailable, async (req,res,next)=>{
    try{
        const payload = req.body;
        payload.password = bcypt.hashSync(payload.password, Number(HASH_ROUND));
        const newUser = await User.create(payload)
        if(newUser) {
            res.status(201).json({message: `Welcome ${payload.first_name}...`})
        } else {
            next({status:400, message: "Create user error..."})
        }
    } catch(err) {
        next(err)
    }
})

router.post('/login', async (req,res,next)=>{
    try{
        const {email, password} = req.body;
        const registeredUser = await User.getByEmail(email);
        if(registeredUser && bcypt.compareSync(password, registeredUser.password)) {
            const token = await generateToken(registeredUser);
            res.json({message: `Welcome back ${registeredUser.first_name}...`, token})
        } else {
            next({status:401, message: "Invalid credentials"})
        }
    } catch(err) {
        next(err)
    }
})

router.post('/password/reset', (req,res,next)=>{
    res.json('password reset')
})


router.get('/logout', restricted, logout, (req,res,next)=>{
    res.json({message: 'Başarılı bir şekilde logout yapıldı.'})
})


module.exports = router;
