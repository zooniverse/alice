import { shallow } from 'enzyme'
import React from 'react'
import AggregatedTranscriptions from './AggregatedTranscriptions'

describe('Component > AggregatedTranscriptions', function () {
  it('should render without crashing', function () {
    shallow(<AggregatedTranscriptions />);
  })
})
