import passport from 'passport'

export const authenticate = {
  jwt: passport.authenticate('jwt', { session: false }),
}
