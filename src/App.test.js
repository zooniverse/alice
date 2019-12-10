import React from 'react'
import { shallow } from 'enzyme'
import { App } from './App'

let wrapper
const contextValues = {
  initialize: () => {},
  initialized: true
}

describe('App', function () {
  it('should render without crashing', function () {
    jest.spyOn(React, 'useContext').mockImplementation((context) => contextValues)
    wrapper = shallow(<App />);
    expect(wrapper).toBeDefined()
  })

  it('should render nothing when not initialized', function () {
    const revisedContext = Object.assign({}, contextValues)
    revisedContext.initialized = false
    jest.spyOn(React, 'useContext').mockImplementation((context) => revisedContext)
    wrapper = shallow(<App />);
    expect(wrapper.getElement()).toBe(null)
  })
})
