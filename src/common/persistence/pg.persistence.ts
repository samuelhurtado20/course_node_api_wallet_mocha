const { Pool } = require('pg')
var { config } = require('dotenv')
config()

export default new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT
})
//module.exports = pool