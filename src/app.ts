import express from 'express'
import * as dotenv from 'dotenv'
import loadContainer from './container'
import { loadControllers } from 'awilix-express'
import cors from 'cors'
const { expressjwt: jwt } = require('express-jwt')

const app: express.Application = express()
// json support
app.use(express.json())

// cors support
app.use(cors())

// config envirotment
dotenv.config({
  path: `${__dirname}` + '/../config/' + `${process.env.APP_ENV}.env`
})
// console.log(process.env.MYSQLUSER)

// container
loadContainer(app)

// JWT
if (process.env.jwt_secret_key) {
  app.use(jwt({
    secret: process.env.jwt_secret_key,
    algorithms: ['HS256'],
    requestPropesty: 'auth'
  }).unless({ path: ['/', '/check'] }))
}

// controllers
app.use(loadControllers(
  'controllers/*.ts',
  { cwd: __dirname }
))

export { app }
