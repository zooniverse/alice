import { shallow } from 'enzyme'
import React from 'react'
import AggregationSettings from './AggregationSettings'

let wrapper

describe('Component > AggregationSettings', function () {
  beforeEach(function() {
    wrapper = shallow(<AggregationSettings />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
