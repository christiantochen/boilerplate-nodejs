export const globalErrorHandler = config => {
  const { env = 'dev' } = config

  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    const response = {
      code: err.status || 500,
      message: err.message || 'No message available',
    }

    if (env === 'dev') {
      response.errors = err.errors
      response.stack = err.stack
    }

    res.status(response.code)
    res.json(response)
  }
}
