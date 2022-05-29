import * as dotenv from 'dotenv'
import { createPool } from 'mysql2/promise'

// config envirotment
dotenv.config()
dotenv.config({
  path: 'config/' + `${process.env.APP_ENV}.env`
})

export default createPool({
  user: process.env.MYSQLUSER,
  host: process.env.MYSQLHOST,
  database: process.env.MYSQLDATABASE,
  password: process.env.MYSQLPASSWORD
})
