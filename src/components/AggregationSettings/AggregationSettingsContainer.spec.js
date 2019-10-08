import { shallow } from 'enzyme'
import React from 'react'
import { AggregationSettingsContainer } from './AggregationSettingsContainer'

let wrapper

describe('Component > AggregationSettingsContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<AggregationSettingsContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
