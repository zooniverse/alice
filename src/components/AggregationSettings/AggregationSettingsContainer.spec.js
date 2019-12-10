import { shallow } from 'enzyme'
import React from 'react'
import { AggregationSettingsContainer } from './AggregationSettingsContainer'

let wrapper
const toggleModalSpy = jest.fn()
const contextValues = {
  aggregations: {
    toggleModal: toggleModalSpy
  }
}

describe('Component > AggregationSettingsContainer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<AggregationSettingsContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should toggle the modal when triggered', function () {
    wrapper.props().closeContainer()
    expect(toggleModalSpy).toHaveBeenCalled()
  })
})
