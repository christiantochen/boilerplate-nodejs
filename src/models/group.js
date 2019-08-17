import {
  GROUP_BELONGS_TO_MANY_MENU,
  GROUP_BELONGS_TO_MANY_USER,
  GROUP_HAS_MANY_GROUP_MENU_PERMISSIONS,
  GROUP_HAS_MANY_USER_GROUP,
  GROUP_MENU_PERMISSION_MODEL_NAME,
  MENU_MODEL_NAME,
  USER_GROUP_MODEL_NAME,
  USER_MODEL_NAME,
  GROUP_MODEL_NAME as modelName,
  GROUP_TABLE_NAME as tableName,
} from '../fixtures/models'

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    code: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  }

  const Group = sequelize.define(modelName, schemaAttributes, { tableName })

  Group.associate = models => {
    Group.belongsToMany(models[MENU_MODEL_NAME], GROUP_BELONGS_TO_MANY_MENU)
    Group.hasMany(models[GROUP_MENU_PERMISSION_MODEL_NAME], GROUP_HAS_MANY_GROUP_MENU_PERMISSIONS)
    //
    Group.belongsToMany(models[USER_MODEL_NAME], GROUP_BELONGS_TO_MANY_USER)
    Group.hasMany(models[USER_GROUP_MODEL_NAME], GROUP_HAS_MANY_USER_GROUP)
  }

  return Group
}
