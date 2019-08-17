import jwt from 'jsonwebtoken'

import config from '../../config'

const {
  jwtSecret,
  jwtRefreshTokenSecret,
  jwtSpecialTokenSecret,
  jwtExpiration,
  jwtRefreshTokenExpiration,
  jwtSpecialTokenExpiration,
} = config

const generateToken = user => jwt.sign({ id: user.id }, jwtSecret, { expiresIn: jwtExpiration })

const generateRefreshToken = user =>
  jwt.sign({ id: user.id }, jwtRefreshTokenSecret, { expiresIn: jwtRefreshTokenExpiration })

const generateSpecialToken = (user, infinite = false) =>
  jwt.sign({ id: user.id }, jwtSpecialTokenSecret, { expiresIn: infinite ? '1y' : jwtSpecialTokenExpiration })

const verifyRefreshToken = token => {
  try {
    return jwt.verify(token, jwtRefreshTokenSecret)
  } catch {
    return false
  }
}

const verifySpecialToken = token => {
  try {
    return jwt.verify(token, jwtSecret)
  } catch {
    return false
  }
}

export default {
  generateToken,
  generateSpecialToken,
  generateRefreshToken,
  verifyRefreshToken,
  verifySpecialToken,
}
