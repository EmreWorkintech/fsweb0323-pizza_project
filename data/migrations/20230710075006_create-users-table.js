/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Roles', tbl=>{
        tbl.increments(); 
        tbl.string('name', 32)
            .notNullable();
    }).createTable("Users", tbl=>{
        tbl.increments(); //id ->primary key
        tbl.string('first_name', 128)
            .notNullable();
        tbl.string('last_name', 128)
            .notNullable();
        tbl.string('email')
            .notNullable()
            .unique();
        tbl.string('password')
            .notNullable();
        tbl.integer('role_id')  //foreign key
            .notNullable()
            .defaultTo(2)
            .references('id')
            .inTable('Roles')
            .onDelete('RESTRICT') //RESTRICT, CASCADE, NO ACTION, SET NULL
            .onUpdate('RESTRICT')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Users').dropTableIfExists('Roles')
};
