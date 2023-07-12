const db = require('../../data/db-config');

const getAll = async ()=> {
    const rawOrders = await db('Orders as o')
                                .join('Users as u', 'o.user_id', 'u.id')
                                .leftJoin('Orders_Toppings as ot', 'o.id', 'ot.order_id')
                                .leftJoin('Toppings as t', 'ot.topping_id', 't.id')
                                .select(
                                    't.id as topping_id',
                                    'o.id as order_id',
                                    'size',
                                    'dough',
                                    'count',
                                    'status',
                                    'total_price',
                                    'note',
                                    't.name as topping_name',
                                    'user_id',
                                    'first_name',
                                    'last_name'
                                );
    const result = rawOrders.reduce((arr,order)=> {
        const recordedOrder = arr.find((item)=>item.order_id===order.order_id);

        if(!recordedOrder) { //yeni bir order 
            //topping yok => 
            let newOrder;
            if(!order.topping_id) {
                newOrder = {
                    order_id: order.order_id,
                    size: order.size,
                    dough: order.dough,
                    count: order.count,
                    total_price: order.total_price,
                    note: order.note,
                    status: order.status,
                    user: {
                        user_id: order.user_id,
                        fullname: order.first_name + " " + order.last_name  
                    },
                    toppings: []
                }
            } else {  //topping var
                newOrder = {
                    order_id: order.order_id,
                    size: order.size,
                    dough: order.dough,
                    count: order.count,
                    total_price: order.total_price,
                    note: order.note,
                    status: order.status,
                    user: {
                        user_id: order.user_id,
                        fullname: order.first_name + " " + order.last_name  
                    },
                    toppings: [{
                        topping_id: order.topping_id,
                        topping_name: order.topping_name
                    }]
                }
            }
            arr.push(newOrder);
        } else { //eski order topping var
            const newTopping = {
                topping_id: order.topping_id,
                topping_name: order.topping_name
            }

            recordedOrder.toppings.push(newTopping)
        }
        
        return arr
    },[])
    return result;       
}

module.exports = {
    getAll
}