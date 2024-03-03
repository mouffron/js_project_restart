'use strict';

module.exports = {

    async up(knex) {
        await knex.schema.table('user', function(table) {
            table.renameColumn('scope', 'role'); // Renommer la colonne de 'scope' à 'role'
        });
    },


    async down(knex) {
        await knex.schema.table('user', function(table) {
            table.renameColumn('role', 'scope'); // Renommer la colonne de 'role' à 'scope'
        });
    },

}
