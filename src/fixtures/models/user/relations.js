export const USER_PROFILE_TABLE_NAME = 'user_profiles'
export const USER_PROFILE_MODEL_NAME = 'UserProfile'

export const USER_TOKENS_TABLE_NAME = 'user_tokens'
export const USER_TOKENS_MODEL_NAME = 'UserToken'

export const USER_DEVICES_TABLE_NAME = 'user_devices'
export const USER_DEVICES_MODEL_NAME = 'UserDevice'

export const USER_GROUP_MODEL_NAME = 'UserGroup'
export const USER_GROUP_TABLE_NAME = 'user_groups'

// ========================================
// USER GROUP
// ========================================
export const USER_BELONGS_TO_MANY_GROUP = {
  through: USER_GROUP_MODEL_NAME,
  foreignKey: 'userId',
  otherKey: 'groupId',
  as: 'groups',
}

export const GROUP_BELONGS_TO_MANY_USER = {
  through: USER_GROUP_MODEL_NAME,
  foreignKey: 'groupId',
  otherKey: 'userId',
  as: 'users',
}
