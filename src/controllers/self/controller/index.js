import Device from './device'
import Group from './group'
import Menu from './menu'

const SelfController = repositories => {
  const { userRepository } = repositories

  const index = async (req, res, next) => {
    const { id } = req.user
    try {
      const user = await userRepository.findByPk(id)
      const userProfile = await user.getProfile()

      res.send(userProfile)
    } catch (err) {
      next(err)
    }
  }

  const changePassword = async (req, res, next) => {
    const { id } = req.user
    const { password } = req.body

    try {
      const user = await userRepository.findByPk(id)
      await user.update({ password })
    } catch (err) {
      next(err)
    }
  }

  const device = Device(repositories)
  const group = Group(repositories)
  const menu = Menu(repositories)

  return { index, changePassword, menu, device, group }
}

export default SelfController
