const router = require('express').Router();
const Order = require('./orders-model')

router.get('/', async (req,res,next)=>{
    const orders = await Order.getAll();
    res.json(orders)
})

router.post('/', async (req,res,next)=>{ //TODO:
    const orders = await Order.create();
    res.json(orders)
})

router.put('/', async (req,res,next)=>{
    const orders = await Order.update();
    res.json(orders)
})

module.exports = router;
