import express from 'express'
import * as dotenv from 'dotenv'
import loadContainer from './container'
import { loadControllers } from 'awilix-express'

const app: express.Application = express()
// json support
app.use(express.json())

// config envirotment
dotenv.config({
  path: `${__dirname}` + '/../config/' + `${process.env.APP_ENV}.env`
})
// console.log(process.env.MYSQLUSER)

// container
loadContainer(app)

// controllers
app.use(loadControllers(
  'controllers/*.ts',
  { cwd: __dirname }
))

export { app }
