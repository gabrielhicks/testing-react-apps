// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

// mock login form
const buildLoginForm = () => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  }
}

test('submitting the form calls onSubmit with username and password', () => {
  // mocking a function call
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  // destructuring a response from my mock login form
  // allowing override with specific desired password
  // this allows testing for specific validations in password
  const {username, password} = buildLoginForm({passowrd: 'abc123'})

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
