const router = require('express').Router();
const User = require('./users-model');

router.get('/', async (req,res,next)=>{
    try {
        const users = await User.getAll();
        res.json(users)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req,res,next)=>{
    try {
        const { id } = req.params;
        const user = await User.getById(id);
        res.json(user)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req,res,next)=>{
    try {
        const { id } = req.params;
        const count = await User.remove(id);
        if(count){
            res.json({message: `User id ${id}, deleted...`})
        } else {
            res.status(400).json({message: `Error in deleting User id ${id}!..`})
        }
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req,res,next)=>{
    try {
        const { id } = req.params;
        const count = await User.update(id, req.body);
        if(count){
            res.json({message: `User id ${id}, updated...`})
        } else {
            res.status(400).json({message: `Error in updating User id ${id}!..`})
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router;
