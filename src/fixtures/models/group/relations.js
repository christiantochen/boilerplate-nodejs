export const GROUP_MENU_PERMISSION_MODEL_NAME = 'GroupMenuPermission'
export const GROUP_MENU_PERMISSION_TABLE_NAME = 'group_menu_permissions'

// ========================================
// GROUP MENU
// ========================================
export const GROUP_BELONGS_TO_MANY_MENU = {
  through: { model: GROUP_MENU_PERMISSION_MODEL_NAME, as: 'permission' },
  foreignKey: 'groupId',
  otherKey: 'menuId',
  as: 'menus',
}

export const MENU_BELONGS_TO_MANY_GROUP = {
  through: { model: GROUP_MENU_PERMISSION_MODEL_NAME, as: 'permission' },
  foreignKey: 'menuId',
  otherKey: 'groupId',
  as: 'groups',
}
