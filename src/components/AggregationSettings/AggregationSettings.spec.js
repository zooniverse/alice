import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import AggregationSettings from './AggregationSettings'
import { REDUCERS } from './AggregationSettingsContainer'
import DBScanReducer from './DBScanReducer'
import OpticsReducer from './OpticsReducer'
import ChooseReducer from './ChooseReducer'
import Confirmation from './Confirmation'

let wrapper
let closeContainerSpy = jest.fn()

describe('Component > AggregationSettings', function () {
  beforeEach(function() {
    wrapper = shallow(
      <AggregationSettings
        closeContainer={closeContainerSpy}
        currentScreen={REDUCERS.CHOOSE}
      />);
  })

  afterEach(() => jest.clearAllMocks());

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should show the ChooseReducer form', function () {
    expect(wrapper.find(ChooseReducer).length).toBe(1)
  })

  describe('props > currentScreen', function () {
    it('should show the OpticsReducer form', function () {
      wrapper = shallow(<AggregationSettings currentScreen={REDUCERS.OPTICS} />)
      expect(wrapper.find(OpticsReducer).length).toBe(1)
    })

    it('should show the DBScanReducer form', function () {
      wrapper = shallow(<AggregationSettings currentScreen={REDUCERS.DBSCAN} />)
      expect(wrapper.find(DBScanReducer).length).toBe(1)
    })
  })

  describe('props > confirmationCallback', function () {
    it('should show the Confirmation overlay with valid function', function () {
      wrapper = shallow(<AggregationSettings confirmationCallback={() => {}} />)
      expect(wrapper.find(Confirmation).length).toBe(1)
    })
  })

  describe('close button', function() {
    it('should execute the closeContainer prop function', function () {
      const closeButton = wrapper.find(Button).first()
      closeButton.props().onClick()
      expect(closeContainerSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('when passing aggregation parameters', function () {
    it('should pass dbscan params', function () {
      const parameters = { eps_slope: 1 }
      wrapper = shallow(
        <AggregationSettings
          currentScreen={REDUCERS.DBSCAN}
          reducer='poly_line_text_reducer'
          parameters={parameters}
        />)
      const dbScan = wrapper.find(DBScanReducer).first()
      expect(dbScan.props().defaultParams).toBe(parameters)
    })

    it('should pass optics params', function () {
      const parameters = { angle_eps: 1 }
      wrapper = shallow(
        <AggregationSettings
          currentScreen={REDUCERS.OPTICS}
          reducer='optics_line_text_reducer'
          parameters={parameters}
        />)
      const optics = wrapper.find(OpticsReducer).first()
      expect(optics.props().defaultParams).toBe(parameters)
    })
  })
})
