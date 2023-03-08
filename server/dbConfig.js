//which enviroment to use
const dbEngine = "development";
const config = require("./knexfile")[dbEngine]; //connection db

module.exports = require("knex")(config)

