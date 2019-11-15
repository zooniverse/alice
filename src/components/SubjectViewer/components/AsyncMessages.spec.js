import { shallow } from 'enzyme'
import React from 'react'
import AsyncMessages from './AsyncMessages'

describe('Component > AsyncMessages', function () {
  it('should render without crashing', function () {
    shallow(<AsyncMessages />);
  })
})
