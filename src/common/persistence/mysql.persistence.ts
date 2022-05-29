import * as dotenv from 'dotenv'
import { createPool } from 'mysql2/promise'

// config envirotment
process.env.NODE_ENV = process.env.NODE_ENV || 'production'
process.env.APP_ENV = process.env.APP_ENV || 'production'
dotenv.config({
  path: 'config/production.env'
})

export default createPool({
  user: process.env.MYSQLUSER as string,
  host: process.env.MYSQLHOST,
  database: process.env.MYSQLDATABASE,
  password: process.env.MYSQLPASSWORD
})
