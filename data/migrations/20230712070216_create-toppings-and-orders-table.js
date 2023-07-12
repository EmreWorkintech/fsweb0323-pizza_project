/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Toppings', tbl=>{
        tbl.increments(); 
        tbl.string('name', 32)
            .notNullable();
        tbl.decimal('price')
            .notNullable()
            .unsigned();
    }).createTable("Orders", tbl=>{
        tbl.increments(); //id ->primary key
        tbl.string('dough', 32)
            .notNullable();
        tbl.string('size', 32)
            .notNullable();
        tbl.string('status', 32)
            .notNullable()
            .defaultTo('Sipariş alındı');
        tbl.string('note');
        tbl.integer('count')
            .notNullable()
            .unsigned();
        tbl.decimal('total_price')
            .notNullable()
            .unsigned();
        tbl.integer('pizza_id')  //foreign key
            .notNullable()
            .references('id')
            .inTable('Pizzas')
            .onDelete('RESTRICT') //RESTRICT, CASCADE, NO ACTION, SET NULL
            .onUpdate('RESTRICT');
        tbl.integer('user_id')  //foreign key
            .notNullable()
            .references('id')
            .inTable('Users')
            .onDelete('RESTRICT') //RESTRICT, CASCADE, NO ACTION, SET NULL
            .onUpdate('RESTRICT');
        tbl.string('created_at')
            .notNullable()
            .defaultTo(knex.fn.now())
    }).createTable('Orders_Toppings', tbl=> {
        tbl.integer('order_id')  //foreign key
            .notNullable()
            .references('id')
            .inTable('Orders')
            .onDelete('CASCADE') //RESTRICT, CASCADE, NO ACTION, SET NULL
            .onUpdate('CASCADE');
        tbl.integer('topping_id')  //foreign key
            .notNullable()
            .references('id')
            .inTable('Toppings')
            .onDelete('RESTRICT') //RESTRICT, CASCADE, NO ACTION, SET NULL
            .onUpdate('RESTRICT');
        tbl.primary(["order_id", "topping_id"]);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Orders_Toppings')
                        .dropTableIfExists('Orders')
                        .dropTableIfExists('Toppings')
};
