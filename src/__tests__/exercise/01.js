// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', () => {
  const counter = document.createElement('div')
  document.body.append(counter)

  ReactDOM.render(<Counter />, counter)
  const counterButtons = counter.querySelectorAll('button')
  const decrement = counterButtons[0]
  const increment = counterButtons[1]
  const message = counter.firstChild.querySelector('div')

  expect(message.textContent).toBe('Current count: 0')
  const incrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0,
  })
  increment.dispatchEvent(incrementClickEvent)
  expect(message.textContent).toBe('Current count: 1')
  const decrementClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 1,
  })
  decrement.dispatchEvent(decrementClickEvent)
  expect(message.textContent).toBe('Current count: 0')
  counter.remove()
})

/* eslint no-unused-vars:0 */
