// Testing Middleware

// 🐨 you'll need both of these:
import {UnauthorizedError} from 'express-jwt'
import errorMiddleware from '../error-middleware'

// 🐨 Write a test for the UnauthorizedError case
test('should be status 401 when unauthorized error', () => {
  const error = new UnauthorizedError('some_error_code', {
    message: 'Some message',
  })
  const res = {json: jest.fn(() => res), status: jest.fn(() => res)}
  errorMiddleware(error, '/foo', res)
  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.json).toHaveBeenCalledWith({
    code: 'some_error_code',
    message: 'Some message',
  })
})
// 🐨 Write a test for the headersSent case
test('should call next when headersSent', () => {
  const next = jest.fn()
  errorMiddleware('some_error', '/foo', {headersSent: 'some_header'}, next)

  expect(next).toHaveBeenCalledWith('some_error')
})

// 🐨 Write a test for the else case (responds with a 500)
test('should return 500 when error', () => {
  const res = {json: jest.fn(() => res), status: jest.fn(() => res)}
  errorMiddleware({code: 'some_error', message: 'error message'}, '/foo', res)

  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.json).toHaveBeenCalledWith({message: 'error message'})
})
