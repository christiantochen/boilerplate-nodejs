import httpStatus from 'http-status'

export class CRUDController {
  constructor(repository) {
    this.repository = repository

    this.index = this.index.bind(this)
    this.show = this.show.bind(this)
    this.store = this.store.bind(this)
    this.update = this.update.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  async index(req, res, next) {
    try {
      const { rows, count } = await this.repository.findAndCountAll(req.query)
      res.page(rows, count)
    } catch (err) {
      next(err)
    }
  }

  async show(req, res, next) {
    const { id } = req.params

    try {
      const item = await this.repository.findByPk(id)
      res.send(item)
    } catch (err) {
      next(err)
    }
  }

  async store(req, res, next) {
    const { user, body } = req

    try {
      const [result, created] = await this.repository.findOrCreate({ where: body, user })
      
      if (created) {
        res.status(httpStatus.CREATED).send(result)
      } else {
        res.status(httpStatus.NOT_MODIFIED).send(result)
      }
    } catch (err) {
      next(err)
    }
  }

  async update(req, res, next) {
    const { user } = req
    const { id } = req.params

    try {
      const item = await this.repository.findByPk(id)

      if (item) {
        const result = await item.update(req.body, { user })
        res.status(httpStatus.OK).send(result)
      } else {
        res.status(httpStatus.NOT_FOUND).send()
      }
    } catch (err) {
      next(err)
    }
  }

  async destroy(req, res, next) {
    const { user } = req
    const { id } = req.params

    try {
      const item = await this.repository.findByPk(id)

      if (item) {
        await item.destroy({ user })
        res.status(httpStatus.NO_CONTENT).send()
      } else {
        res.status(httpStatus.NOT_FOUND).send()
      }
    } catch (err) {
      next(err)
    }
  }
}
