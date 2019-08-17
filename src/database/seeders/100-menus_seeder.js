import { MENU_TABLE_NAME } from '../../fixtures/models'
import { forEachAsync } from '../../libs/utils'
import { Menu as MenuRepository } from '../../models'

const records = [
  {
    id: 1,
    code: 'FACILITY_MECHANIC',
    name: 'Facility',
    children: [
      {
        id: 3,
        code: 'COAL_RECEIVING',
        name: 'Coal Receiving',
      },
    ],
  },
  {
    id: 2,
    code: 'FACILITY_ELECTRICIAN',
    name: 'Facility',
    children: [
      {
        id: 4,
        code: 'CRUSHER_PLANT',
        name: 'Crusher Plant',
      },
    ],
  },
]

const schema = process.env.DB_SCHEMA

export default {
  up: queryInterface =>
    forEachAsync(records, record => MenuRepository.create(record, { include: { all: true } })).then(() =>
      queryInterface.sequelize.query(
        `ALTER SEQUENCE "${process.env.DB_SCHEMA}"."menus_id_seq" RESTART WITH ${records.length + 1};`,
      ),
    ),
  down: queryInterface => queryInterface.bulkDelete({ tableName: MENU_TABLE_NAME, schema }),
}
