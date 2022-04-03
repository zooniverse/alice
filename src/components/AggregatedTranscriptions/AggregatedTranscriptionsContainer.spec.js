import { shallow } from 'enzyme'
import React from 'react'
import AggregatedTranscriptionsContainer from './AggregatedTranscriptionsContainer'

describe('Component > AggregatedTranscriptionsContainer', function () {
  const addLineSpy = jest.fn()
  const context = {
    aggregations: {},
    projects: { isViewer: false },
    transcriptions: {
      activeTranscriptionIndex: 0,
      addLine: addLineSpy
    }
  }
  let wrapper

  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => context)
    wrapper = shallow(<AggregatedTranscriptionsContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should add a line', function () {
    wrapper.props().addLine()
    expect(addLineSpy).toHaveBeenCalled()
  })
})
