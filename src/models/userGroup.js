import {
  GROUP_MODEL_NAME,
  MODEL_BELONGS_TO_GROUP,
  MODEL_BELONGS_TO_USER,
  USER_MODEL_NAME,
  USER_GROUP_MODEL_NAME as modelName,
  USER_GROUP_TABLE_NAME as tableName,
} from '../fixtures/models'

export default sequelize => {
  const schemaAttributes = {}

  const UserGroup = sequelize.define(modelName, schemaAttributes, { tableName })

  UserGroup.associate = models => {
    UserGroup.belongsTo(models[USER_MODEL_NAME], MODEL_BELONGS_TO_USER)
    UserGroup.belongsTo(models[GROUP_MODEL_NAME], MODEL_BELONGS_TO_GROUP)
  }

  return UserGroup
}
