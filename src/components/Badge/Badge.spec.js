import { shallow } from 'enzyme'
import React from 'react'
import Badge from './Badge'

let wrapper

describe('Component > Badge', function () {
  beforeAll(function () {
    wrapper = shallow(<Badge />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
