import httpStatus from 'http-status'

import { CRUDController } from '../../libs/base'

export default class Controller extends CRUDController {
  constructor({ menuRepository, groupRepository }) {
    super(menuRepository)

    this.groupRepository = groupRepository

    this.store = this.store.bind(this)
  }

  async store(req, res, next) {
    const { user, body } = req

    try {
      const [menu, created] = await this.repository.findOrCreate({ where: body, user })

      if (created) {
        const groups = await this.groupRepository.findAll({ attributes: ['id'], raw: true })
        await menu.addGroups(groups.map(group => group.id))
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
