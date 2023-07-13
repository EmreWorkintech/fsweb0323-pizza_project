const db = require('../../data/db-config');
const { formatOrders } = require('../../helpers');

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
    const result = formatOrders(rawOrders);
    return result;       // [ ... ]
}

const getById = async (id) => {
    const rawOrders = await db('Orders as o')
            .join('Users as u', 'o.user_id', 'u.id')
            .leftJoin('Orders_Toppings as ot', 'o.id', 'ot.order_id')
            .leftJoin('Toppings as t', 'ot.topping_id', 't.id')
            .where('o.id', id)
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
    const result = formatOrders(rawOrders);
    return result[0];  // { ... }
    
}

const create = async (payload) => {
   //1. order create edeceğim
   /*
        {
            count,
            dough,
            total_price
            topppings: [1,3,5]
        }
   */
  // 2. orders_toppings'leri create edeceğim

  let order_id;
  await db.transaction( async trx=> {
    const toppings = payload.toppings;
    delete payload.toppings;
    [order_id] = await trx('Orders').insert(payload)

    for(let i=0; i<toppings.length; i++) {
        const topping = {
            order_id: order_id,
            topping_id: toppings[i]
        }
        await trx('Orders_Toppings').insert(topping);
    }

  })


  const recordedOrder = await getById(order_id);
  return recordedOrder;
}

const update = async (id, payload) => {
    //1. order create edeceğim
    /*
         {
             count,
             dough,
             total_price
             topppings: [1,3,5]
         }
    */
   // 2. orders_toppings'leri create edeceğim
 
   await db.transaction( async trx=> {
     const toppings = payload.toppings;
     delete payload.toppings;
     await trx('Orders').where('id',id).update(payload)

     await trx('Orders_Toppings').where('order_id',id).delete()
     //topping kaydını tek seferde yapalım
     if(toppings.length > 0) {
        
        const toppingsPayload = toppings.map(item=>{  //1
            return {
                order_id: id,
                topping_id: item
            }
         })
    
        await trx('Orders_Toppings').insert(toppingsPayload);
     }
     

   })
 
   const recordedOrder = await getById(id);
   return recordedOrder;
 }


module.exports = {
    getAll,
    getById,
    create,
    update
}