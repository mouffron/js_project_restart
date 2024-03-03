'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.table('user', function(table) {
            table.string('scope').notNull();
        });

    },

    async down(knex) {
        await knex.schema.table('users', function(table) {
            table.dropColumn('scope');
        });

    }
}
