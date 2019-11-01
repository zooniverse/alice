import { shallow } from 'enzyme'
import React from 'react'
import Resizer from './Resizer'

let wrapper

describe('Component > Resizer', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<Resizer />);
    expect(wrapper).toBeDefined()
  })
})
