import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import useragent from 'express-useragent'
import methodOverride from 'method-override'
import passport from 'passport'

import { joiErrorHandler } from '../../middleware/joi'
import { globalErrorHandler } from './globalErrorHandler'
import passportStrategy from './passportStrategy'
import routes from './routes'

export default config => {
  const { bodyParserExtended, bodyParserLimit, jwtSecret, jwtSchema, env } = config

  const app = express()

  app.use(cors())

  // lets you use HTTP verbs such as PUT or DELETE
  // in places where the client doesn't support it
  app.use(methodOverride())

  // parse body params and attache them to req.body
  app.use(bodyParser.json({ limit: bodyParserLimit }))

  // support parsing of application/x-www-form-urlencoded post data
  app.use(bodyParser.urlencoded({ extended: bodyParserExtended }))

  // mount passport
  app.use(passport.initialize())
  passport.use('jwt', passportStrategy({ jwtSecret, jwtSchema }))

  app.use(useragent.express())

  // mount api v1 routes
  app.use('/', routes)

  // mount error handler
  app.use(joiErrorHandler())
  app.use(globalErrorHandler({ env }))

  return app
}
