import httpStatus from 'http-status'

import { CRUDController } from '../../libs/base'

export default class Controller extends CRUDController {
  constructor({ groupRepository, menuRepository }) {
    super(groupRepository)

    this.menuRepository = menuRepository

    this.store = this.store.bind(this)
  }

  async store(req, res, next) {
    const { user, body } = req

    try {
      const [group, created] = await this.repository.findOrCreate({ where: body, user })

      if (created) {
        const menus = await this.menuRepository.findAll({ attributes: ['id'], raw: true })
        await group.addMenus(menus.map(menu => menu.id))
        res.status(httpStatus.CREATED).send()
      }
      else {
        res.status(httpStatus.NOT_MODIFIED).send()
      }
      
    } catch (err) {
      next(err)
    }
  }
}
