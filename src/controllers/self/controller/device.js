import httpStatus from 'http-status'

export default repositories => {
  const { userRepository } = repositories

  const index = async (req, res, next) => {
    const { id } = req.user

    try {
      const user = await userRepository.findByPk(id)
      const userDevices = await user.getDevices()
      res.send(userDevices)
    } catch (err) {
      next(err)
    }
  }

  const store = async (req, res, next) => {
    const { id } = req.user
    const body = _.omit(req.body, ['token'])
    const { imei } = body

    try {
      const user = await userRepository.findByPk(id)
      const userDevice = await user.getDevice({ where: { imei } })

      if (!userDevice) {
        await user.createDevice(body, { user })
      } else {
        await userDevice.update(body, { user })
      }

      res.status(httpStatus.CREATED).send()
    } catch (err) {
      next(err)
    }
  }

  return { index, store }
}
