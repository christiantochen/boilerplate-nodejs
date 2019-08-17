import httpStatus from 'http-status'

export default class Controller {
  constructor({ authService }) {
    this.authService = authService

    this.login = this.login.bind(this)
    this.refreshToken = this.refreshToken.bind(this)
    this.logout = this.logout.bind(this)
  }

  async login(req, res, next) {
    const { body: { username, password, imei } } = req

    try {
      const [token, refreshToken] = await this.authService.login(username, password, imei)
      res.send({ token, refreshToken })
    } catch (err) {
      next(err)
    }
  }


  async refreshToken(req, res, next) {
    const { body: { token } } = req

    try {
      const newToken = await this.authService.refreshToken(token)
      res.send({ token: newToken })
    } catch (err) {
      next(err)
    }
  }

  async logout(req, res, next) {
    const { body: { imei }, user } = req

    try {
      this.authService.logout(user, imei)
      res.status(httpStatus.NO_CONTENT).send()
    } catch (err) {
      next(err)
    }
  }
}
