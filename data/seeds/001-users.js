/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
 
  await knex('roles').insert([
    {id: 1, name: 'Admin'},
    {id: 2, name: 'User'}
  ]);
  await knex('users').insert([
    {id: 1, first_name: 'Emre', last_name: 'Şahiner', email: 'emre@wit.com.tr', password: '$2a$08$EiWmQrmBFUwx4ds1QWby9.khnOoYbYjlrZRhbGOus9bvW62pvkP8.', role_id: 1},
    {id: 2, first_name: 'Erdem', last_name: 'Günay', email: 'erdem@wit.com.tr', password: '$2a$08$EiWmQrmBFUwx4ds1QWby9.khnOoYbYjlrZRhbGOus9bvW62pvkP8.', role_id: 2},
    {id: 3, first_name: 'Hatice', last_name: 'Kalkan', email: 'hatice@wit.com.tr', password: '$2a$08$EiWmQrmBFUwx4ds1QWby9.khnOoYbYjlrZRhbGOus9bvW62pvkP8.', role_id: 2}  ]);
};
