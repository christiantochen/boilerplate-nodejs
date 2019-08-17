export default repositories => {
  const { userRepository } = repositories

  const index = async (req, res, next) => {
    const { id } = req.user

    try {
      const user = await userRepository.findByPk(id)
      const userGroups = await user.getGroups({ joinTableAttributes: [] })
      res.send(userGroups)
    } catch (err) {
      next(err)
    }
  }

  return { index }
}
