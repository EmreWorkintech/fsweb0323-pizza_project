const router = require('express').Router();
const Order = require('./orders-model')

router.get('/', async (req,res,next)=>{
    const orders = await Order.getAll();
    res.json(orders)
})

router.get('/:id', async (req,res,next)=>{
    const order = await Order.getById(req.params.id);
    res.json(order)
})

router.post('/', async (req,res,next)=>{ 
    const order = await Order.create(req.body);
    res.status(201).json(order)
})

router.put('/:id', async (req,res,next)=>{
    const order = await Order.update(req.params.id, req.body);
    res.json(order)
})

module.exports = router;
