import {
  FOREIGN_KEY_CONSTRAINT,
  GROUP_MENU_PERMISSION_MODEL_NAME,
  GROUP_MODEL_NAME,
  MENU_BELONGS_TO_MANY_GROUP,
  MENU_BELONGS_TO_PARENT,
  MENU_HAS_MANY_CHILDREN,
  MENU_HAS_MANY_GROUP_MENU_PERMISSIONS,
  MENU_TABLE_REFERENCE,
  MENU_MODEL_NAME as modelName,
  MENU_TABLE_NAME as tableName,
} from '../fixtures/models'

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    parentId: FOREIGN_KEY_CONSTRAINT({
      type: DataTypes.INTEGER,
      references: MENU_TABLE_REFERENCE,
    }),
    code: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
  }

  const defaultScope = { attributes: { exclude: ['parentId'] } }

  const Menu = sequelize.define(modelName, schemaAttributes, { tableName, defaultScope })

  Menu.associate = models => {
    Menu.belongsTo(models[modelName], MENU_BELONGS_TO_PARENT)
    Menu.hasMany(models[modelName], MENU_HAS_MANY_CHILDREN)
    //
    Menu.belongsToMany(models[GROUP_MODEL_NAME], MENU_BELONGS_TO_MANY_GROUP)
    Menu.hasMany(models[GROUP_MENU_PERMISSION_MODEL_NAME], MENU_HAS_MANY_GROUP_MENU_PERMISSIONS)
  }

  return Menu
}
