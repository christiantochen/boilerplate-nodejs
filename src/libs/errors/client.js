import httpStatus from 'http-status'

export class ClientError extends Error {
  constructor(message) {
    super(message)
    this.status = httpStatus.BAD_REQUEST
    this.message = message || 'Invalid Request'
  }
}
