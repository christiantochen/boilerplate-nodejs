import { USER_GROUP_TABLE_NAME, USER_PROFILE_TABLE_NAME, USER_TABLE_NAME } from '../../fixtures/models'
import { forEachAsync } from '../../libs/utils'
import { User as UserRepository } from '../../models'

const records = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    email: 'christianto_chen@live.com',
    profile: { firstName: 'Administrator', lastName: 'X' },
    userGroups: [{ groupId: 1 }, { groupId: 2 }],
    root: true,
  },
]

const schema = process.env.DB_SCHEMA

export default {
  up: queryInterface =>
    forEachAsync(records, record => UserRepository.create(record, { include: { all: true, nested: true } })).then(() =>
      queryInterface.sequelize.query(`ALTER SEQUENCE "${schema}"."users_id_seq" RESTART WITH ${records.length + 1};`),
    ),
  down: queryInterface =>
    queryInterface
      .bulkDelete({ tableName: USER_GROUP_TABLE_NAME, schema })
      .then(() => queryInterface.bulkDelete({ tableName: USER_PROFILE_TABLE_NAME, schema }))
      .then(() => queryInterface.bulkDelete({ tableName: USER_TABLE_NAME, schema })),
}
