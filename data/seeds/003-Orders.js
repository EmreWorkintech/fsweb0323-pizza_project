/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Toppings').truncate()
  await knex('Orders_Toppings').truncate()
  await knex('Orders').truncate()
  await knex('Toppings').insert([
    {id: 1, name: 'Sucuk', price: 5.00},
    {id: 2, name: 'Salam', price: 5.00},
    {id: 3, name: 'Sosis', price: 5.00},
    {id: 4, name: 'Zeytin', price: 5.00},
    {id: 5, name: 'Mısır', price: 5.00},
    {id: 6, name: 'Jalepeno Biber', price: 5.00},
    {id: 7, name: 'Soğan', price: 5.00},
    {id: 8, name: 'Sarımsak', price: 5.00},
    {id: 9, name: 'Domates', price: 5.00},
  ]);
  await knex('Orders').insert([
    {id: 1, dough: 'Kalın Kenar', size: "Büyük", status: "Teslim Edildi",  note: "Soğan olmasın",  count: 2,  total_price: 105.60, pizza_id: 1, user_id:2, created_at: "2023-07-11 09:00:00"},
    {id: 2, dough: 'İnce Kenar', size: "Küçük", status: "Hazırlanıyor",  note: "Zeytin olmasın",  count: 1,  total_price: 80.60, pizza_id: 1, user_id:2, created_at: "2023-07-12 09:00:00"},
    {id: 3, dough: 'Kalın Kenar', size: "Orta", status: "Sipariş Alındı",  count: 4,  total_price: 135.60, pizza_id: 2, user_id:2, created_at: "2023-07-13 09:00:00"},
    {id: 4, dough: 'İnce Kenar', size: "Büyük", status: "Teslime Hazır",  note: "Hızlı olsun",  count: 3,  total_price: 175.60, pizza_id: 1, user_id:1, created_at: "2023-07-14 09:00:00"},
    {id: 5, dough: 'Kalın Kenar', size: "Büyük", status: "Sipariş Alındı",  note: "Paket olsun",  count: 2,  total_price: 105.00, pizza_id: 2, user_id:1, created_at: "2023-07-15 09:00:00"},
  ]);
  await knex('Orders_Toppings').insert([
    {order_id: 1, topping_id: 1},
    {order_id: 1, topping_id: 2},
    {order_id: 1, topping_id: 3},
    {order_id: 1, topping_id: 4},
    {order_id: 1, topping_id: 5},
    {order_id: 2, topping_id: 1},
    {order_id: 2, topping_id: 2},
    {order_id: 4, topping_id: 1},
    {order_id: 4, topping_id: 2},
    {order_id: 4, topping_id: 8},
    {order_id: 4, topping_id: 9}
  ]);
};
