const knex = require('knex');
const path = require('path');

// Initialiser la connexion à la base de données avec Knex
const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../../database/ticket_system.db'), // Chemin vers le fichier de la base de données SQLite
  },
  useNullAsDefault: true, // Requis pour SQLite
});

// Fonction pour créer la base de données et les tables si elles n'existent pas
const initializeDatabase = async () => {
  const hasUsersTable = await db.schema.hasTable('users');
  const hasTicketsTable = await db.schema.hasTable('tickets');

  if (!hasUsersTable) {
    await db.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      table.string('role').notNullable(); // utilisateur, technicien, admin
      table.timestamps(true, true); // created_at, updated_at
    });
  }

  if (!hasTicketsTable) {
    await db.schema.createTable('tickets', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description').notNullable();
      table.enu('status', ['open', 'in progress', 'closed']).notNullable();
      table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('technicianId').unsigned().references('id').inTable('users').nullable().onDelete('SET NULL');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('closedAt').nullable();
    });
  }
};

// Exporter la connexion à la base de données et la fonction d'initialisation
module.exports = {
  db,
  initializeDatabase,
};