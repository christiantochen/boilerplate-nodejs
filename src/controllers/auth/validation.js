import * as Joi from '@hapi/joi'

import { joiValidator } from '../../middleware'

const validator = {
  login: {
    body: joiValidator.body(
      Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required(),
        imei: Joi.string().optional(),
      }))
  },
  refresh: {
    body: joiValidator.body(
      Joi.object({
        token: Joi.string().required(),
      }))
  },
  logout: {
    body: joiValidator.body(
      Joi.object({
        imei: Joi.alternatives(Joi.string(), Joi.number()).optional()
      }))
  },
}

export default validator