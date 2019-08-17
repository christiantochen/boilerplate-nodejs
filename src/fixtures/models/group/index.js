export const GROUP_TABLE_NAME = 'groups'
export const GROUP_MODEL_NAME = 'Group'
export const MODEL_BELONGS_TO_GROUP = { foreignKey: 'groupId', as: 'group' }

// ========================================
// REFERENCE
// ========================================

export const GROUP_TABLE_REFERENCE = {
  model: { tableName: GROUP_TABLE_NAME, schema: process.env.DB_SCHEMA },
  key: 'id',
}

// ========================================
// GROUP MENU
// ========================================

export const GROUP_HAS_MANY_GROUP_MENU_PERMISSIONS = {
  foreignKey: 'groupId',
  as: { singular: 'permission', plural: 'permissions' },
}

// ========================================
// USER GROUPS
// ========================================

export const GROUP_HAS_MANY_USER_GROUP = {
  foreignKey: 'groupId',
  as: 'userGroups',
}

export * from './relations'
