// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {build, fake} from '@jackfranklin/test-data-bot'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

// mock login form
// changed mock login form to use test-data-bot library
const buildLoginForm = build('User', {
  fields: {
    username: fake(u => u.internet.userName()),
    password: fake(p => p.internet.password()),
  },
})

const specificPassword = buildLoginForm({
  overrides: {
    password: 'abc123',
  },
})

test('submitting the form calls onSubmit with username and password', () => {
  // mocking a function call
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  // destructuring a response from my mock login form
  // ovverriding seems more difficult, however there is a method to override using the test-data-bot library
  // I can call on that custom function to test for specific validations
  let {username, password} = buildLoginForm()
  console.log('testing for validations', specificPassword.password)
  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)

  const button = screen.getByRole('button', {name: /submit/i})
  userEvent.click(button)

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})

/*
eslint
  no-unused-vars: "off",
*/
