import React from 'react'
import { mount } from 'enzyme'
import App from './App'

let wrapper

describe('App', function () {
  beforeAll(function () {
    jest.spyOn(React, 'useContext').mockImplementation((context) => {  return { auth: { checkCurrent: () => {} } } })
    wrapper = mount(<App />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
