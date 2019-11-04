import React from 'react'
import { mount } from 'enzyme'
import App from './App'

let wrapper
const contextValues = {
  auth: {
    checkCurrent: () => {},
  },
  client: {
    initialize: () => {}
  }
}

describe('App', function () {
  beforeAll(function () {
    jest.spyOn(React, 'useContext').mockImplementation((context) => contextValues)
    wrapper = mount(<App />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
