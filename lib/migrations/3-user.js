'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {
        });
    },

    async down(knex) {

        await knex.schema.dropTableIfExists('user');
    }
};
