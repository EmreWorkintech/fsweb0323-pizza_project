/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  
  await knex('Ratings').insert([
    {id: 1, rate: 4, pizza_id: 1, user_id: 2},
    {id: 2, rate: 1, pizza_id: 1, user_id: 3},
    {id: 3, rate: 3, pizza_id: 1, user_id: 1},
    {id: 4, rate: 3, pizza_id: 2, user_id: 2},
    {id: 5, rate: 3, pizza_id: 2, user_id: 3},
  ]);
};
