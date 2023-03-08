// enviroment configuritation knex.
// npx knex init (create knex file)
// npx knex migrate:make create_database_tables (create folder migrations)

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/database.db3'
    },
    useNullAsDefault: true
  },
};
