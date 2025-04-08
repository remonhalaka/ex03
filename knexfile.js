module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './database/ticket-system.db'
  },
  useNullAsDefault: true,
  migrations: {
    directory: './database/migrations'
  },
  seeds: {
    directory: './database/seeds'
  }
};