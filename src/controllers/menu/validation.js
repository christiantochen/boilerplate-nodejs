import * as Joi from '@hapi/joi'

import { joiValidator } from '../../middleware'

const params = Joi.object({
  id: Joi.number().required(),
});

const validator = {
  store: {
    body: joiValidator.body(
      Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
      }))
  },
  show: {
    params: joiValidator.params(params)
  },
  update: {
    params: joiValidator.params(params),
    body: joiValidator.body(
      Joi.object({
        name: Joi.string().required(),
      }))
  },
  destroy: {
    params: joiValidator.params(params),
  },
}

export default validator