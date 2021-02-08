// Testing Authentication API Routes

// 🐨 import the things you'll need
// 💰 here, I'll just give them to you. You're welcome
import axios from 'axios'
import {resetDb} from 'utils/db-utils'
import * as generate from 'utils/generate'
import startServer from '../start'

// 🐨 you'll need to start/stop the server using beforeAll and afterAll

let server

beforeAll(async () => {
  server = await startServer({port: 8000})
})

afterAll(() => server.close())

beforeEach(() => resetDb())

// 🐨 beforeEach test in this file we want to reset the database

test('auth flow', async () => {
  const {username, password} = generate.loginForm()

  const registerResult = await axios.post(
    'http://localhost:8000/api/auth/register',
    {
      username,
      password,
    },
  )

  expect(registerResult.data.user).toEqual({
    username,
    id: expect.any(String),
    token: expect.any(String),
  })

  // login
  const loginResult = await axios.post('http://localhost:8000/api/auth/login', {
    username,
    password,
  })

  expect(loginResult.data.user).toEqual({
    username,
    id: expect.any(String),
    token: expect.any(String),
  })

  // authenticated request
  const userResult = await axios.get('http://localhost:8000/api/auth/me', {
    headers: {
      Authorization: `Bearer ${loginResult.data.user.token}`,
    },
  })

  expect(userResult.data.user).toEqual({
    username,
    id: expect.any(String),
    token: expect.any(String),
  })
})
