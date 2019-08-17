import { GROUP_MENU_PERMISSION_TABLE_NAME, GROUP_TABLE_NAME } from '../../fixtures/models'
import { forEachAsync } from '../../libs/utils'
import { Group as GroupRepository } from '../../models'

const records = [
  {
    id: 1,
    code: 'ADMINISTRATOR',
    name: 'Administrator',
    permissions: [1, 2, 3, 4].map(menuId => ({
      allowRead: true,
      allowCreate: true,
      allowUpdate: true,
      allowDelete: true,
      menuId,
    })),
  },
  {
    id: 2,
    code: 'MECHANIC',
    name: 'Mechanic',
    permissions: [1, 3].map(menuId => ({
      allowRead: true,
      allowCreate: true,
      allowUpdate: true,
      allowDelete: true,
      menuId,
    })),
  },
  {
    id: 3,
    code: 'ELECTRICIAN',
    name: 'Electrician',
    permissions: [2, 4].map(menuId => ({
      allowRead: true,
      allowCreate: true,
      allowUpdate: true,
      allowDelete: true,
      menuId,
    })),
  },
]

const schema = process.env.DB_SCHEMA

export default {
  up: queryInterface =>
    forEachAsync(records, record => GroupRepository.create(record, { include: { all: true } })).then(() =>
      queryInterface.sequelize.query(
        `ALTER SEQUENCE "${process.env.DB_SCHEMA}"."groups_id_seq" RESTART WITH ${records.length + 1};`,
      ),
    ),
  down: queryInterface =>
    queryInterface
      .bulkDelete({ tableName: GROUP_MENU_PERMISSION_TABLE_NAME, schema })
      .then(() => queryInterface.bulkDelete({ tableName: GROUP_TABLE_NAME, schema })),
}
