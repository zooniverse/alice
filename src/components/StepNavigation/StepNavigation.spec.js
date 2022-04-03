import { shallow } from 'enzyme'
import React from 'react'
import { Button, RadioButton, RadioButtonGroup, Text } from 'grommet'
import StepNavigation from './StepNavigation'

describe('Component > StepNavigation', function () {
  let wrapper
  const setStepSpy = jest.fn()
  const steps = [0, 1, 2, 3, 4, 5, 6]
  const TOTAL_PAGES = 7

  beforeEach(function() {
    wrapper = shallow(
      <StepNavigation
        setStep={setStepSpy}
        steps={steps}
        totalPages={TOTAL_PAGES}
      />);
  })

  afterEach(() => jest.clearAllMocks());

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should execute the onChange function', function () {
    const buttons = wrapper.find(RadioButtonGroup).first().props()
    const mockEvent = {
      target: {
        value: buttons.options[0].id
      }
    }
    buttons.onChange(mockEvent)
    expect(setStepSpy).toHaveBeenCalled()
  })

  it('should move back a step', function () {
    const leftButton = wrapper.find(Button).first().props()
    leftButton.onClick()
    expect(setStepSpy).toHaveBeenCalledWith(leftButton['data-index'])
  })

  it('should move forward a step', function () {
    const rightButton = wrapper.find(Button).last().props()
    rightButton.onClick()
    expect(setStepSpy).toHaveBeenCalledWith(rightButton['data-index'])
  })

  describe('with first and last pages', function () {
    let ellipses, radioButtons;

    beforeEach(function () {
      wrapper.setProps({ activeStep: 3 })
      ellipses = wrapper.find(Text)
      radioButtons = wrapper.find(RadioButton)
    })

    it('should show the pages', function () {
      expect(ellipses.length).toBe(2)
      expect(radioButtons.length).toBe(2)
    })

    describe('onClick', function () {
      it('should show go to the first page', function () {
        radioButtons.first().simulate('click')
        expect(setStepSpy).toHaveBeenCalledWith(0)
      })

      it('should show go to the last page', function () {
        radioButtons.last().simulate('click')
        expect(setStepSpy).toHaveBeenCalledWith(TOTAL_PAGES - 1)
      })
    })
  })
})

describe('StepNavigation with no props', function () {
  let wrapper

  it('should return nothing', function () {
    wrapper = shallow(<StepNavigation />)
    expect(wrapper.props()).toEqual({})
  })
})
