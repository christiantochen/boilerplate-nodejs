import { flatMapAsync } from '../../../libs/utils'

export default repositories => {
  const { userRepository } = repositories

  const index = async (req, res, next) => {
    const { id } = req.user
    try {
      const user = await userRepository.findByPk(id)
      const groups = await user.getGroups({ joinTableAttributes: [] })
      const menus = await flatMapAsync(groups, g =>
        g.getMenus({
          joinTableAttributes: ['allowCreate', 'allowRead', 'allowUpdate', 'allowDelete'],
          attributes: ['code', 'name'],
          nest: true,
          raw: true,
        }),
      )

      const uniqueMenus = menus.reduce((uniqueItems, newItem) => {
        const oldItemIndex = _.findIndex(uniqueItems, { code: newItem.code })

        if (oldItemIndex >= 0) {
          const oldItem = uniqueItems[oldItemIndex]
          oldItem.GroupMenuPermission = {
            ...oldItem.GroupMenuPermission,
            ..._.pickBy(newItem.GroupMenuPermission, value => value),
          }
        } else {
          uniqueItems.push(newItem)
        }

        return uniqueItems
      }, [])

      res.send(uniqueMenus)
    } catch (err) {
      next(err)
    }
  }

  return { index }
}
