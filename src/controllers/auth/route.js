import { Router } from 'express'

import { authenticate } from '../../middleware'
import { UserDevice as UserDeviceRepository, User as UserRepository } from '../../models'
import Controller from './controller'
import Service from './service'
import validation from './validation'

const basePath = `/auth`
const setPath = path => `${basePath}/${path}`
const routes = Router()
const controller = new Controller({ authService: Service(UserRepository, UserDeviceRepository) })

routes.route(setPath('login')).post(validation.login.body, controller.login)
routes.route(setPath('refresh')).post(validation.refresh.body, controller.refreshToken)
routes.route(setPath('logout')).post(authenticate.jwt, validation.logout.body, controller.logout)

export default routes
