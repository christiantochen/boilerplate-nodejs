import {
  FOREIGN_KEY_CONSTRAINT,
  MODEL_BELONGS_TO_USER,
  USER_MODEL_NAME,
  USER_TABLE_REFERENCE,
  USER_DEVICES_MODEL_NAME as modelName,
  USER_DEVICES_TABLE_NAME as tableName,
} from '../fixtures/models'

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    imei: { type: DataTypes.STRING, uniqueKey: true, allowNull: true },
    userId: FOREIGN_KEY_CONSTRAINT({ type: DataTypes.INTEGER, references: USER_TABLE_REFERENCE }),
    fcmToken: { type: DataTypes.STRING },
    token: { type: DataTypes.STRING },
    attributes: { type: DataTypes.JSON },
  }

  const UserDevice = sequelize.define(modelName, schemaAttributes, { tableName })

  UserDevice.associate = models => {
    UserDevice.belongsTo(models[USER_MODEL_NAME], MODEL_BELONGS_TO_USER)
  }

  return UserDevice
}
