import Express from './express'

global._ = require('lodash')

require('dotenv').config()

export const express = Express({
  bodyParserExtended: process.env.BODY_PARSER_EXTENDED || true,
  bodyParserLimit: `${process.env.BODY_PARSER_LIMIT_IN_MB || '50'}mb`,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  jwtSchema: process.env.JWT_SCHEMA || 'bearer',
})

export default {
  host: process.env.SERVICE_HOST,
  port: process.env.SERVICE_PORT,
  env: process.env.NODE_ENV,
  dbName: process.env.DB_NAME,
  dbUsername: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbDialect: process.env.DB_DIALECT,
  dbSchema: process.env.DB_SCHEMA,
  dbEnableLogging: process.env.DB_ENABLE_LOGGING,
  dbDebug: process.env.DB_DEBUG,
  jwtSecret: process.env.JWT_SECRET,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  jwtSpecialTokenSecret: process.env.JWT_SPECIAL_TOKEN_SECRET,
  jwtExpiration: `${process.env.JWT_EXPIRATION_MINUTES}m`,
  jwtRefreshTokenExpiration: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_DAYS}d`,
  jwtSpecialTokenExpiration: `${process.env.JWT_SPECIAL_TOKEN_EXPIRATION_MINUTES}M`,
}
