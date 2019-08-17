// ========================================
// USER
// ========================================

export const USER_TABLE_NAME = 'users'
export const USER_MODEL_NAME = 'User'
export const MODEL_BELONGS_TO_USER = { foreignKey: 'userId', as: 'user' }

// ========================================
// REFERENCE
// ========================================

export const USER_TABLE_REFERENCE = {
  model: { tableName: USER_TABLE_NAME, schema: process.env.DB_SCHEMA },
  key: 'id',
}

// ========================================
// USER PROFILE
// ========================================

export const USER_HAS_ONE_USER_PROFILE = { foreignKey: 'userId', as: 'profile' }

// ========================================
// USER TOKENS
// ========================================

export const USER_HAS_MANY_USER_TOKENS = { foreignKey: 'userId', as: 'tokens' }

export const USER_HAS_ONE_FORGOT_TOKEN = {
  foreignKey: 'userId',
  as: 'forgotToken',
  constraints: false,
  scope: {
    type: 'FORGOT_PASSWORD_TOKEN',
  },
}
export const USER_HAS_ONE_RESET_TOKEN = {
  foreignKey: 'userId',
  as: 'resetToken',
  constraints: false,
  scope: {
    type: 'RESET_PASSWORD_TOKEN',
  },
}
export const USER_HAS_ONE_NEW_TOKEN = {
  foreignKey: 'userId',
  as: 'newToken',
  constraints: false,
  scope: {
    type: 'NEW_USER_TOKEN',
  },
}

// ========================================
// USER DEVICES
// ========================================

export const USER_HAS_MANY_USER_DEVICES = {
  foreignKey: 'userId',
  as: 'devices',
}

// TODO: SCOPE IMEI NOT NULL
export const USER_HAS_ONE_USER_DEVICES = {
  foreignKey: 'userId',
  as: 'device',
  constraints: false,
}

export const USER_HAS_ONE_WEB_DEVICES = {
  foreignKey: 'userId',
  as: 'webDevice',
  constraints: false,
  scope: {
    imei: null,
  },
}

// ========================================
// USER GROUPS
// ========================================

export const USER_HAS_MANY_USER_GROUP = {
  foreignKey: 'userId',
  as: 'userGroups',
}

export * from './relations'
