import Sequelize from 'sequelize'

import config from '../../config'
import { USER_TABLE_REFERENCE, USER_DEVICES_TABLE_NAME as tableName } from '../../fixtures/models'

const { dbSchema } = config

export const schemaAttributes = {
  id: { autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
  imei: { type: Sequelize.STRING, allowNull: true, unique: 'unique_imei_per_user' },
  userId: {
    type: Sequelize.INTEGER,
    references: USER_TABLE_REFERENCE,
    field: 'user_id',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    constraints: true,
    unique: 'unique_imei_per_user',
  },
  fcmToken: { type: Sequelize.STRING, field: 'fcm_token' },
  token: { type: Sequelize.STRING },
  attributes: { type: Sequelize.JSON },
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
  up: async queryInterface =>
    queryInterface.createTable(tableName, schemaAttributes, {
      schema: dbSchema,
      uniqueKeys: {
        unique_imei_per_user: {
          customIndex: true,
          fields: ['imei', 'user_id'],
        },
      },
    }),
  down: queryInterface => queryInterface.dropTable({ tableName, schema: dbSchema }),
}
