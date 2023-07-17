/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('Ratings').truncate();
  await knex('Orders_Toppings').truncate();
  await knex('Toppings').truncate();
  await knex('Orders').truncate();
  await knex('Pizzas').truncate();
  await knex('users').truncate();  //del, truncate
  await knex('roles').truncate();
};
