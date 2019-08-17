export const FOREIGN_KEY_CONSTRAINT = additionalConstaints => ({
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
  constraints: true,
  ...additionalConstaints,
})

export * from './user'
export * from './menu'
export * from './group'
