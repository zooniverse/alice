import { shallow } from 'enzyme'
import React from 'react'
import { Select } from 'grommet'
import { Formik } from 'formik'
import { SearchModal } from './SearchModal'

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

describe('Component > SearchModal', function () {
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
})
