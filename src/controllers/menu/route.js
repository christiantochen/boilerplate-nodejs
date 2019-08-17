import { Router } from 'express'

import { authenticate, paginate } from '../../middleware'
import { Group as groupRepository, Menu as menuRepository } from '../../models'
import Controller from './controller'
import validation from './validation'

const basePath = `/menus`
const setPath = path => `${basePath}/${path}`
const routes = Router()
const controller = new Controller({ menuRepository, groupRepository })

routes
  .route(basePath)
  .get(authenticate.jwt, paginate, controller.index)
  .post(authenticate.jwt, validation.store.body, controller.store)

routes
  .route(setPath(':id'))
  .get(authenticate.jwt, validation.show.params, controller.show)
  .put(authenticate.jwt, validation.update.params, validation.update.body, controller.update)
  .delete(authenticate.jwt, validation.destroy.params, controller.destroy)

export default routes
