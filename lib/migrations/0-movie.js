'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.createTable('movie', function(table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('description').notNullable();
            table.date('releaseDate').notNullable();
            table.string('director').notNullable();
            table.dateTime('createdAt').notNull().defaultTo(knex.fn.now());
            table.dateTime('updatedAt').notNull().defaultTo(knex.fn.now());
        });
    },

    async down(knex) {
        await knex.schema.dropTable('movies');
    }

};
