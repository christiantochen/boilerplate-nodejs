import {
  GROUP_MODEL_NAME,
  MENU_MODEL_NAME,
  MODEL_BELONGS_TO_GROUP,
  MODEL_BELONGS_TO_MENU,
  GROUP_MENU_PERMISSION_MODEL_NAME as modelName,
  GROUP_MENU_PERMISSION_TABLE_NAME as tableName,
} from '../fixtures/models'

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    allowCreate: { type: DataTypes.BOOLEAN },
    allowRead: { type: DataTypes.BOOLEAN },
    allowUpdate: { type: DataTypes.BOOLEAN },
    allowDelete: { type: DataTypes.BOOLEAN },
  }

  const GroupMenuPermission = sequelize.define(modelName, schemaAttributes, { tableName })

  GroupMenuPermission.associate = models => {
    GroupMenuPermission.belongsTo(models[MENU_MODEL_NAME], MODEL_BELONGS_TO_MENU)
    GroupMenuPermission.belongsTo(models[GROUP_MODEL_NAME], MODEL_BELONGS_TO_GROUP)
  }

  return GroupMenuPermission
}
