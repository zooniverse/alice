import { shallow } from 'enzyme'
import React from 'react'
import { Select } from 'grommet'
import { Formik } from 'formik'
import { SearchModal } from './SearchModal'

describe('Component > SearchModal', function () {
  let wrapper;
  let innerForm;
  let onSubmitSpy = jest.fn()
  let setFieldValueSpy = jest.fn()
  let setValueSpy = jest.fn()
  const initialValues = {
    id: null,
    type: '',
    unseen: false,
    in_progress: false,
    ready: false,
    approved: false,
    flagged: false,
    lowConsensus: false,
  }

  beforeEach(function() {
    wrapper = shallow(
      <SearchModal
        initialValues={initialValues}
        onSubmit={onSubmitSpy}
        setValue={setValueSpy}
      />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  describe('Rendered form', function () {
    beforeEach(function() {
      const Form = wrapper.find(Formik).first().props().children
      innerForm = shallow(
        <Form
          setFieldValue={setFieldValueSpy}
          values={initialValues}
        />)
    })

    it('should call prop functions with the Select onChange', function () {
      const option = 'Test Value'
      const select = innerForm.find(Select).first()
      select.simulate('change', { option })
      expect(setValueSpy).toBeCalledWith(option)
    })
  })

  describe('form validations', function () {
    let formValidation

    beforeEach(function () {
      formValidation = wrapper.find(Formik).first().props().validate
    })

    it('should require a type', function () {
      const outcome = formValidation(initialValues)
      expect(outcome).toEqual({
        type: 'Type is required'
      })
    })

    it('should require an ID', function () {
      const copiedValues = Object.assign({}, initialValues)
      copiedValues.type = 'ZOONIVERSE ID'
      const outcome = formValidation(copiedValues)
      expect(outcome).toEqual({
        id: 'You must enter an ID'
      })
    })

    it('should require Zooniverse ID to be a number', function () {
      const copiedValues = Object.assign({}, initialValues)
      copiedValues.type = 'ZOONIVERSE ID'
      copiedValues.id = 'some id'
      const outcome = formValidation(copiedValues)
      expect(outcome).toEqual({
        id: 'Zooniverse ID must be a number'
      })
    })
  })
})
