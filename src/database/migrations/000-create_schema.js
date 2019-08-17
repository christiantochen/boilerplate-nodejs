import config from '../../config'

const { dbSchema } = config

export default {
    up: queryInterface => queryInterface.createSchema(dbSchema),
    down: queryInterface => queryInterface.dropSchema(dbSchema),
}
