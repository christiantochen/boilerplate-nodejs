import Sequelize from 'sequelize'

import config from '../../config'
import { GROUP_TABLE_REFERENCE, USER_TABLE_REFERENCE, USER_GROUP_TABLE_NAME as tableName } from '../../fixtures/models'

const { dbSchema } = config

export const schemaAttributes = {
  groupId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: GROUP_TABLE_REFERENCE,
    field: 'group_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    constraints: true,
  },
  userId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: USER_TABLE_REFERENCE,
    field: 'user_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    constraints: true,
  },
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
