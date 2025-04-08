const { Knex } = require('knex');

exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary();
        table.string('username').notNullable().unique(); // Nom d'utilisateur unique
        table.string('password').notNullable(); // Mot de passe
        table.string('role').notNullable(); // 'user', 'technician' ou 'admin'
        table.timestamps(true, true); // created_at et updated_at
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users'); // Supprimer la table si elle existe
};