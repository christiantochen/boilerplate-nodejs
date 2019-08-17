import Sequelize from 'sequelize'

import config from '../../config'
import {
  GROUP_TABLE_REFERENCE,
  MENU_TABLE_REFERENCE,
  USER_TABLE_REFERENCE,
  GROUP_MENU_PERMISSION_TABLE_NAME as tableName,
} from '../../fixtures/models'

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
  menuId: {
    primaryKey: true,
    type: Sequelize.INTEGER,
    references: MENU_TABLE_REFERENCE,
    field: 'menu_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    constraints: true,
  },
  allowCreate: { type: Sequelize.BOOLEAN, field: 'allow_create', defaultValue: false },
  allowRead: { type: Sequelize.BOOLEAN, field: 'allow_read', defaultValue: false },
  allowUpdate: { type: Sequelize.BOOLEAN, field: 'allow_update', defaultValue: false },
  allowDelete: { type: Sequelize.BOOLEAN, field: 'allow_delete', defaultValue: false },
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
