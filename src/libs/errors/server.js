import httpStatus from 'http-status'

export class TimeoutError extends Error {
  constructor(message) {
    super(message)
    this.status = httpStatus.INTERNAL_SERVER_ERROR
    this.message = message || 'Server Timeout'
  }
}
