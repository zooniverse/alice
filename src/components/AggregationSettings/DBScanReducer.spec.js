import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import { Formik } from 'formik'
import { REDUCERS } from './AggregationSettingsContainer'
import DBScanReducer from './DBScanReducer'

let wrapper
let setCallbackSpy = jest.fn()
let setScreenSpy = jest.fn()

describe('Component > DBScanReducer', function () {
  beforeEach(function() {
    wrapper = shallow(<DBScanReducer setCallback={setCallbackSpy} setScreen={setScreenSpy} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  describe('form children', function () {
    let form
    beforeEach(function() {
      const Form = wrapper.find(Formik).first().props().children
      form = shallow(<Form />)
    })

    it('should return on back button press', function () {
      const backButton = form.find(Button).first()
      backButton.simulate('click')
      expect(setScreenSpy).toHaveBeenCalledWith(REDUCERS.CHOOSE)
    })

    it('should set the callback on apply press', function () {
      const applyButton = form.find(Button).last()
      applyButton.simulate('click')
      expect(setCallbackSpy).toHaveBeenCalled()
    })
  })
})
