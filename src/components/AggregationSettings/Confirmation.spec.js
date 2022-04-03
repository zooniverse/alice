import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import Confirmation from './Confirmation'

describe('Component > Confirmation', function () {
  let wrapper

  beforeEach(function() {
    wrapper = shallow(<Confirmation />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  describe('props', function () {
    let callbackSpy = jest.fn()
    let setCallbackSpy = jest.fn()

    beforeEach(function() {
      wrapper = shallow(<Confirmation callback={callbackSpy} setCallback={setCallbackSpy} />);
    })

    it('should call the setCallback props when applying changes', function() {
      const backButton = wrapper.find(Button).first()
      backButton.simulate('click')
      expect(setCallbackSpy).toHaveBeenCalled()
    })

    it('should call the setCallback props when applying changes', function() {
      const applyButton = wrapper.find(Button).last()
      applyButton.simulate('click')
      expect(callbackSpy).toHaveBeenCalled()
    })
  })
})
