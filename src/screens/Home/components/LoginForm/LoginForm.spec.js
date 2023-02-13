import { shallow } from 'enzyme'
import React from 'react'
import { Formik } from 'formik'
import { Button } from 'grommet'
import LoginForm from './LoginForm'

describe('Component > LoginForm', function () {
  let wrapper
  let validateFormSpy = jest.fn().mockResolvedValue(true)
  const initialValues = {
    login: '',
    password: '',
  }

  beforeEach(function () {
    wrapper = shallow(<LoginForm />)
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  describe('Form children', function () {
    let form
    beforeEach(function() {
      const Form = wrapper.find(Formik).first().props().children
      form = shallow(
        <Form
          values={initialValues}
          validateForm={validateFormSpy}
        />)
    })

    it.skip('should call validate form with submit', function () {
      const button = form.find(Button).first()
      button.props().onClick()
      expect(validateFormSpy).toHaveBeenCalled()
    })
  })
})
