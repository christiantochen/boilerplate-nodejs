/* eslint-disable no-param-reassign */
import fs from 'fs'
import path from 'path'

import Sequelize from 'sequelize'

import config from '../config'
import { USER_TABLE_REFERENCE } from '../fixtures/models'
import { applyFieldsQuery, applySearchQuery, applySortQuery } from '../libs/sequelize'

const { dbName, dbUsername, dbPassword, dbHost, dbDialect, dbEnableLogging, dbDebug, dbSchema } = config

const basename = path.basename(__filename)
// eslint-disable-next-line no-console
const dbLogging = JSON.parse(dbEnableLogging) ? console.log : false

const sequelize = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  timezone: '+07:00',
  logging: dbLogging,
  DEBUG: dbDebug,
  define: {
    schema: dbSchema,
    searchPath: dbSchema,
    timestamps: true,
    paranoid: true,
    underscored: true,
    classMethods: {},
    defaultScope: {},
    hooks: {
      beforeFind(options) {
        // =================================
        // Required for Paginated Request
        // =================================
        applyFieldsQuery(this, options)
        applySortQuery(this, options)
        applySearchQuery(this, options)
        // =================================
        // End for Paginated Request
        // =================================
        return options
      },
      beforeCreate(instance, options) {
        instance.createdBy = options.user?.id
        instance.updatedBy = options.user?.id
      },
      beforeUpdate(instance, options) {
        instance.updatedBy = options.user?.id
      },
      beforeDestroy(instance, options) {
        instance.deletedBy = options.user?.id
      },
    },
  },
})

sequelize.beforeDefine(attributes => {
  const references = USER_TABLE_REFERENCE
  attributes.createdAt = { type: Sequelize.DATE }
  attributes.createdBy = { type: Sequelize.INTEGER, references }
  attributes.updatedAt = { type: Sequelize.DATE }
  attributes.updatedBy = { type: Sequelize.INTEGER, references }
  attributes.deletedAt = { type: Sequelize.DATE }
  attributes.deletedBy = { type: Sequelize.INTEGER, references }
})

const db = {}

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db)
  }
})

Sequelize.postgres.DATE.parse = value => value.toLocaleString()

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
