'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.table('user', function(table) {
            table.string('password').notNull();
            table.string('mail').notNull();
            table.string('username').notNull();
        });

    },

    async down(knex) {
        await knex.schema.table('users', function(table) {
            table.dropColumn('password');
            table.dropColumn('mail');
            table.dropColumn('username');
        });

    }
}
