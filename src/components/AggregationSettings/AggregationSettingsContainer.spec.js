import { shallow } from 'enzyme'
import * as React from 'react';
import { AggregationSettingsContainer } from './AggregationSettingsContainer'

let wrapper
const reaggregateDBScanSpy = jest.fn()
const reaggregateOpticsSpy = jest.fn()
const toggleModalSpy = jest.fn()
const contextValues = {
  aggregations: {
    toggleModal: toggleModalSpy
  },
  transcriptions: {
    current: {
      reducer: '',
      parameters: {}
    },
    reaggregateOptics: reaggregateOpticsSpy,
    reaggregateDBScan: reaggregateDBScanSpy,
  }
}

describe('Component > AggregationSettingsContainer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<AggregationSettingsContainer />);
  })

  afterEach(() => jest.clearAllMocks());

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should toggle the modal when triggered', function () {
    wrapper.props().closeContainer()
    expect(toggleModalSpy).toHaveBeenCalled()
  })

  it('should reaggregate the DBScan', function () {
    wrapper.props().submitDBScan()
    expect(toggleModalSpy).toHaveBeenCalled()
    expect(reaggregateDBScanSpy).toHaveBeenCalled()
  })

  it('should reaggregate the optics', function () {
    wrapper.props().submitOptics()
    expect(toggleModalSpy).toHaveBeenCalled()
    expect(reaggregateOpticsSpy).toHaveBeenCalled()
  })
})
