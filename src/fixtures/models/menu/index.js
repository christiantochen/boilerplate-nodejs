export const MENU_TABLE_NAME = 'menus'
export const MENU_MODEL_NAME = 'Menu'
export const MODEL_BELONGS_TO_MENU = { foreignKey: 'menuId', as: 'menu' }

// ========================================
// REFERENCE
// ========================================

export const MENU_TABLE_REFERENCE = {
  model: { tableName: MENU_TABLE_NAME, schema: process.env.DB_SCHEMA },
  key: 'id',
}

// ========================================
// PARENT CHILDREN
// ========================================

export const MENU_HAS_MANY_CHILDREN = { foreignKey: 'parentId', as: 'children' }
export const MENU_BELONGS_TO_PARENT = { foreignKey: 'parentId', as: 'parent' }

// ========================================
// GROUP MENU
// ========================================
export const MENU_HAS_MANY_GROUP_MENU_PERMISSIONS = {
  foreignKey: 'menuId',
  as: { singular: 'permission', plural: 'permissions' },
}

export * from './relations'
