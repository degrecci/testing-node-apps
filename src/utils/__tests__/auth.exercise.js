const {isPasswordAllowed} = require('utils/auth')

describe('isPasswordAllowed', () => {
  const allowedPasswords = ['!aBc123']
  const disallowedPasswords = [
    'a2c!',
    '123456!',
    'ABCdef!',
    'abc123!',
    'ABC123!',
    'ABCdef123',
  ]

  allowedPasswords.forEach((password) =>
    test(`Allows ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(true)
    }),
  )

  disallowedPasswords.forEach((password) =>
    test(`Disallows is ${password}`, () => {
      expect(isPasswordAllowed(password)).toBe(false)
    }),
  )
})
