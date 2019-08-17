import bcrypt from 'bcrypt'

import {
  GROUP_MODEL_NAME,
  USER_BELONGS_TO_MANY_GROUP,
  USER_DEVICES_MODEL_NAME,
  USER_GROUP_MODEL_NAME,
  USER_HAS_MANY_USER_DEVICES,
  USER_HAS_MANY_USER_GROUP,
  USER_HAS_MANY_USER_TOKENS,
  USER_HAS_ONE_USER_DEVICES,
  USER_HAS_ONE_USER_PROFILE,
  USER_HAS_ONE_WEB_DEVICES,
  USER_PROFILE_MODEL_NAME,
  USER_TOKENS_MODEL_NAME,
  USER_MODEL_NAME as modelName,
  USER_TABLE_NAME as tableName,
} from '../fixtures/models'

export default (sequelize, DataTypes) => {
  const schemaAttributes = {
    id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    username: { allowNull: false, unique: true, type: DataTypes.STRING },
    password: {
      type: DataTypes.STRING,
      set(password) {
        this.setDataValue('password', bcrypt.hashSync(password, bcrypt.genSaltSync(8)))
      },
    },
    email: { unique: true, type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, unique: true },
    root: { type: DataTypes.BOOLEAN },
  }

  const defaultScope = { attributes: { exclude: ['password'] } }

  const User = sequelize.define(modelName, schemaAttributes, { tableName, defaultScope })

  // eslint-disable-next-line func-names
  User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password)
  }

  User.associate = models => {
    User.hasOne(models[USER_PROFILE_MODEL_NAME], USER_HAS_ONE_USER_PROFILE)
    //
    User.hasMany(models[USER_TOKENS_MODEL_NAME], USER_HAS_MANY_USER_TOKENS)
    //
    User.hasMany(models[USER_DEVICES_MODEL_NAME], USER_HAS_MANY_USER_DEVICES)
    User.hasOne(models[USER_DEVICES_MODEL_NAME], USER_HAS_ONE_USER_DEVICES)
    User.hasOne(models[USER_DEVICES_MODEL_NAME], USER_HAS_ONE_WEB_DEVICES)
    //
    User.hasMany(models[USER_GROUP_MODEL_NAME], USER_HAS_MANY_USER_GROUP)
    User.belongsToMany(models[GROUP_MODEL_NAME], USER_BELONGS_TO_MANY_GROUP)
  }

  return User
}
