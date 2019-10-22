import { shallow } from 'enzyme'
import React from 'react'
import AggregationSettings from './AggregationSettings'
import { REDUCERS } from './AggregationSettingsContainer'
import DBScanReducer from './DBScanReducer'
import OpticsReducer from './OpticsReducer'
import ChooseReducer from './ChooseReducer'
import Confirmation from './Confirmation'

let wrapper

describe('Component > AggregationSettings', function () {
  beforeEach(function() {
    wrapper = shallow(<AggregationSettings currentScreen={REDUCERS.CHOOSE} />);
  })

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
})
