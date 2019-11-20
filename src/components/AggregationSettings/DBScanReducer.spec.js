import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import { Formik } from 'formik'
import { REDUCERS } from './AggregationSettingsContainer'
import DBScanReducer from './DBScanReducer'

let form
let wrapper
let setCallbackSpy = jest.fn()
let setScreenSpy = jest.fn()
const error = 'This is an error'

const initialValues = {
  epsSlope: 25,
  epsLine: 40,
  epsWord: 40,
  gutterTol: 0,
  minSamples: 1,
  minWordCount: 1
}

const errors = {
  epsSlope: error,
  epsLine: error,
  epsWord: error,
  gutterTol: error,
  minSamples: error,
  minWordCount: error
}

describe('Component > DBScanReducer', function () {
  beforeEach(function() {
    wrapper = shallow(<DBScanReducer setCallback={setCallbackSpy} setScreen={setScreenSpy} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  describe('form children', function () {
    beforeEach(function() {
      const Form = wrapper.find(Formik).first().props().children
      form = shallow(<Form values={initialValues} />)
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

  describe('form children with errors', function () {
    it('should render without crashing', function () {
      const Form = wrapper.find(Formik).first().props().children
      form = shallow(<Form errors={errors} values={initialValues} />)
      expect(form).toBeDefined()
    })
  })
})
