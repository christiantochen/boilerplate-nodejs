import Sequelize from 'sequelize'

import config from '../../config'
import { USER_TABLE_REFERENCE, USER_TABLE_NAME as tableName } from '../../fixtures/models'

const { dbSchema } = config

export const schemaAttributes = {
  id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
  username: { allowNull: false, unique: true, type: Sequelize.STRING },
  password: { type: Sequelize.STRING },
  email: { allowNull: false, type: Sequelize.STRING, unique: true },
  phone: { type: Sequelize.STRING, unique: true },
  root: { type: Sequelize.BOOLEAN, defaultValue: false },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  createdBy: {
    type: Sequelize.INTEGER,
    references: USER_TABLE_REFERENCE,
    field: 'created_by',
  },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
  updatedBy: {
    type: Sequelize.INTEGER,
    references: USER_TABLE_REFERENCE,
    field: 'updated_by',
  },
  deletedAt: { type: Sequelize.DATE, field: 'deleted_at' },
  deletedBy: {
    type: Sequelize.INTEGER,
    references: USER_TABLE_REFERENCE,
    field: 'deleted_by',
  },
}

export default {
  up: queryInterface => queryInterface.createTable(tableName, schemaAttributes, { schema: dbSchema }),
  down: queryInterface => queryInterface.dropTable({ tableName, schema: dbSchema }),
}
