import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'

let wrapper
const contextValues = {
  initialize: () => {},
  initialized: true
}

describe('App', function () {
  beforeAll(function () {
    jest.spyOn(React, 'useContext').mockImplementation((context) => contextValues)
    wrapper = shallow(<App />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
