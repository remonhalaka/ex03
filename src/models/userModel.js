const { Model } = require('objection');
const knex = require('../utils/db');

Model.knex(knex);

class User extends Model {
  // Nom de la table associée au modèle
  static get tableName() {
    return 'users';
  }

  // Colonne identifiant unique
  static get idColumn() {
    return 'id';
  }

  // Schéma JSON pour valider les données du modèle
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'password', 'role'],

      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 6 },
        role: { type: 'string', enum: ['user', 'technician', 'admin'] },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    };
  }

  // Avant l'insertion, définir la date de création
  $beforeInsert() {
    this.createdAt = new Date().toISOString();
  }

  // Avant la mise à jour, définir la date de mise à jour
  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = User;