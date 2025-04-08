const { Knex } = require('knex');

exports.up = function(knex) {
  return knex.schema.createTable('tickets', function(table) {
    table.increments('id').primary(); // Identifiant unique du ticket
    table.string('title').notNullable(); // Titre du ticket
    table.text('description').notNullable(); // Description du ticket
    table.enu('status', ['open', 'in progress', 'closed']).notNullable(); // Statut du ticket
    table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE'); // ID de l'utilisateur associé
    table.integer('technicianId').unsigned().references('id').inTable('users').nullable().onDelete('SET NULL'); // ID du technicien associé
    table.timestamp('createdAt').defaultTo(knex.fn.now()); // Date de création
    table.timestamp('closedAt').nullable(); // Date de fermeture
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tickets'); // Supprimer la table si elle existe
};