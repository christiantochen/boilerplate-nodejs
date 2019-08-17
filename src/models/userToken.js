import {
  FOREIGN_KEY_CONSTRAINT,
  MODEL_BELONGS_TO_USER,
  USER_MODEL_NAME,
  USER_TABLE_REFERENCE,
  USER_TOKENS_MODEL_NAME as modelName,
  USER_TOKENS_TABLE_NAME as tableName,
} from '../fixtures/models'

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    userId: FOREIGN_KEY_CONSTRAINT({
      type: DataTypes.INTEGER,
      references: USER_TABLE_REFERENCE,
    }),
    token: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
  }

  const UserToken = sequelize.define(modelName, schemaAttributes, { tableName })

  UserToken.associate = models => {
    UserToken.belongsTo(models[USER_MODEL_NAME], MODEL_BELONGS_TO_USER)
  }

  return UserToken
}
