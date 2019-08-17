import { ClientError } from '../../libs/errors'
import jwt from '../../libs/jwt'

const service = (UserRepository, UserDeviceRepository) => ({
  login: async (username, password, imei) => {
    const user = await UserRepository.findOne({ where: { username }, attributes: ['id', 'password'] })

    if (user && (await user.validatePassword(password))) {
      const token = await jwt.generateToken(user)
      const refreshToken = await jwt.generateRefreshToken(user)

      if (!imei) {
        const webDevice = await user.getWebDevice()
        if (webDevice) await webDevice.update({ token: refreshToken }, { user })
        else await user.createWebDevice({ token: refreshToken }, { user })
      } else {
        const device = await user.getDevice({ where: { imei } })
        if (device) await device.update({ token: refreshToken }, { user })
        else await user.createDevice({ imei, token: refreshToken }, { user })
      }

      return [token, refreshToken]
    }

    throw new ClientError('Username and/or Password wrong')
  },
  refreshToken: async refreshToken => {
    const refreshTokenInfo = await jwt.verifyRefreshToken(refreshToken)
    if (!refreshTokenInfo) throw new ClientError('Invalid Token')

    const userDevice = await UserDeviceRepository.findOne({
      where: { userId: refreshTokenInfo.id, token: refreshToken },
    })
    if (!userDevice) throw new ClientError('Invalid Token')

    const user = await userDevice.getUser()
    const token = await jwt.generateToken(user)

    return token
  },
  logout: async (token, imei) => {
    const { id } = token

    return UserDeviceRepository.update({ token: null }, { where: { userId: id, imei }, user: { id } })
  },
  forgotPassword: async email => {
    const user = await UserRepository.findOne({ where: { email } })
    if (!user) throw new ClientError(`User with ${email} email was not found`)

    const forgotToken = await user.getForgotToken()
    let token = forgotToken?.token

    if (!token) {
      token = jwt.generateSpecialToken(user)
      await user.createForgotToken({ token }, { user })
    } else if (!jwt.verifySpecialToken(forgotToken.token)) {
      token = jwt.generateSpecialToken(user)
      await forgotToken.update({ token }, { user })
    }

    return token
  },
  forgotPasswordTokenValidate: async incomingForgotToken => {
    const tokenInfo = await jwt.verifySpecialToken(incomingForgotToken)
    if (!tokenInfo) throw new ClientError(`Invalid Token`)

    const user = await UserRepository.findByPk(tokenInfo.id)
    if (!user) throw new ClientError(`Invalid Token`)

    const forgotToken = await user.getForgotToken()
    if (incomingForgotToken !== forgotToken?.token) throw new ClientError(`Invalid Token`)

    const resetToken = await user.getResetToken()
    let token = resetToken?.token

    if (!token) {
      token = jwt.generateSpecialToken({ id: tokenInfo.id })
      await user.createResetToken({ token }, { user })
    } else if (!jwt.verifySpecialToken(token)) {
      token = jwt.generateSpecialToken({ id: tokenInfo.id })
      await resetToken.update({ token }, { user })
    }

    return token
  },
  resetPassword: async (incomingResetToken, password) => {
    const tokenInfo = await jwt.verifySpecialToken(incomingResetToken)
    if (!tokenInfo) throw new ClientError(`Invalid Token`)

    const user = await UserRepository.findByPk(tokenInfo.id)
    if (!user) throw new ClientError(`Invalid Token`)

    const resetToken = await user.getResetToken()

    if (incomingResetToken !== resetToken?.token) throw new ClientError(`Invalid Token`)

    await user.update({ password }, { user })
    await resetToken.destroy({ user })

    const forgotToken = await user.getForgotToken()
    if (forgotToken) await forgotToken.destroy({ user })

    return user
  },
  newPassword: async (incomingNewToken, password) => {
    const tokenInfo = await jwt.verifySpecialToken(incomingNewToken)
    if (!tokenInfo) throw new ClientError(`Invalid Token`)

    const user = await UserRepository.findByPk(tokenInfo.id)
    if (!user) throw new ClientError(`Invalid Token`)

    const newToken = await user.getNewToken()
    if (incomingNewToken !== newToken?.token) throw new ClientError(`Invalid Token`)

    await user.update({ password }, { user })
    await newToken.destroy({ user })

    return user
  },
})

export default service
