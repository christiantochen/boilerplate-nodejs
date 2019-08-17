import { createLogger, format, transports } from 'winston'

import config from '../config'
import { LOG_FORMAT, LOG_LEVEL_INFO } from '../fixtures/log'

const LEVEL = Symbol.for('level')
const { env } = config

const customFormat = format.printf(LOG_FORMAT)

const levelUpperCaseFormat = format(info => _.assignIn(info, { level: info.level.toUpperCase() }))

const logger = createLogger({
  level: LOG_LEVEL_INFO,
  format: format.combine(levelUpperCaseFormat(), format.timestamp(), customFormat),
  transports: [],
  exitOnError: false,
})

/**
 * Log only the messages the match `level`.
 */
function filterOnly(level) {
  // eslint-disable-next-line consistent-return
  return format(info => {
    if (info[LEVEL] === level) {
      return info
    }
  })()
}

// const mode = logMode ? logMode.split(',') : [];

// if (mode.includes('file')) {
if (env !== 'dev') {
  logger.add(new transports.File({ filename: 'logs/info.log', format: filterOnly('info'), level: 'info' }))
  logger.add(new transports.File({ filename: 'logs/error.log', format: filterOnly('error'), level: 'error' }))
}

// if (mode.includes('console')) {
if (env !== 'prod') {
  logger.add(
    new transports.Console({
      format: format.combine(levelUpperCaseFormat(), format.timestamp(), format.colorize(), customFormat),
    }),
  )
}

export default {
  info: (name, message, details) => logger.info({ name, message, details }),
  warn: (name, message, details) => logger.warn({ name, message, details }),
  error: ({ name, message, details, stack }) => logger.error({ name, message, details, stack }),
}
