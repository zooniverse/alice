import { shallow } from 'enzyme'
import React from 'react'
import ErrorNotifier from './ErrorNotifier'

let wrapper

describe('Component > ErrorNotifier', function () {
  beforeEach(function() {
    wrapper = shallow(<ErrorNotifier />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
