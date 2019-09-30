import { shallow } from 'enzyme'
import React from 'react'
import AggregatedTranscriptionsContainer from './AggregatedTranscriptionsContainer'

let wrapper

describe('Component > AggregatedTranscriptionsContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<AggregatedTranscriptionsContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
