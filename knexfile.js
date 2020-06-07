module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user: 'jorge',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }
}
