/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Ratings', tbl=>{
        tbl.increments(); 
        tbl.integer('rate')
            .notNullable()
            .unsigned();
        tbl.integer('pizza_id')  //foreign key
            .notNullable()
            .references('id')
            .inTable('Pizzas')
            .onDelete('CASCADE') //RESTRICT, CASCADE, NO ACTION, SET NULL
            .onUpdate('CASCADE');
        tbl.integer('user_id')  //foreign key
            .notNullable()
            .references('id')
            .inTable('Users')
            .onDelete('RESTRICT') //RESTRICT, CASCADE, NO ACTION, SET NULL
            .onUpdate('RESTRICT');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Ratings')
};
