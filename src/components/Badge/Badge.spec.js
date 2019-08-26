import { shallow } from 'enzyme'
import React from 'react'
import Badge from './Badge'

describe('Component > Badge', function () {
  it('should render without crashing', function () {
    shallow(<Badge />);
  })
})
