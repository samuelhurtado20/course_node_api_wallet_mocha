// const { config } = require('dotenv')
// config()
const { createPool } = require('mysql2/promise')

// console.log(process.env.MYSQLUSER)
// export default createPool({
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT
// })
// module.exports = pool

export default createPool({
  host: 'localhost',
  user: 'root',
  database: 'api_wallet',
  password: 'sam18623'
})
