import { shallow } from 'enzyme'
import React from 'react'
import Overlay from '../Overlay'
import AggregatedTranscriptions from './AggregatedTranscriptions'

describe('Component > AggregatedTranscriptions', function () {
  it('should render without crashing', function () {
    shallow(<AggregatedTranscriptions />);
  })

  it('should display an overlay when given prop', function () {
    const wrapper = shallow(<AggregatedTranscriptions showOverlay />)
    expect(wrapper.find(Overlay).length).toBe(1)
  })
})
