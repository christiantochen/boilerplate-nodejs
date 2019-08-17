import {
  FOREIGN_KEY_CONSTRAINT,
  MODEL_BELONGS_TO_USER,
  USER_MODEL_NAME,
  USER_TABLE_REFERENCE,
  USER_PROFILE_MODEL_NAME as modelName,
  USER_PROFILE_TABLE_NAME as tableName,
} from '../fixtures/models'

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    userId: FOREIGN_KEY_CONSTRAINT({
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: USER_TABLE_REFERENCE,
    }),
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`
      },
    },
  }

  const UserProfile = sequelize.define(modelName, schemaAttributes, { tableName })

  UserProfile.associate = models => {
    UserProfile.belongsTo(models[USER_MODEL_NAME], MODEL_BELONGS_TO_USER)
  }

  return UserProfile
}
