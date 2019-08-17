import { expect } from 'chai'

import jwt from '.'

const { generateToken, generateRefreshToken, verifyRefreshToken } = jwt

describe('jwt.generator', () => {
  const user = { id: 999 }

  describe('generateToken', () => {
    const token = generateToken(user)
    user.token = token
    it('should generated a string instance and not an object instance when `user` is valid', () => {
      expect(token).to.be.a('string').but.not.an('object')
    })
  })
  describe('generateRefreshToken', () => {
    const refreshToken = generateRefreshToken(user)
    user.refreshToken = refreshToken
    it('should generated a string instance and not an object instance', () => {
      expect(refreshToken).to.be.a('string').but.not.an('object')
    })
  })
  describe('verifyRefreshToken', () => {
    const verifiedToken = verifyRefreshToken(user.refreshToken)

    it('should return an object with `id`, `iat`, and `exp` property when verified', () => {
      expect(verifiedToken).to.be.a('object').to.have.all.keys('id', 'iat', 'exp')
    })
    it('should have the same value with the issuer', () => {
      expect(verifiedToken).to.have.property('id', user.id)
    })
  })
})
