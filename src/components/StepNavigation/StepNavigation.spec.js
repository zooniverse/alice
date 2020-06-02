import { shallow } from 'enzyme'
import React from 'react'
import { Button, Text } from 'grommet'
import StepNavigation, { StyledRadioButtonGroup } from './StepNavigation'

let wrapper
const setStepSpy = jest.fn()
const steps = [0, 1, 2, 3, 4, 5, 6]

describe('Component > StepNavigation', function () {
  beforeEach(function() {
    wrapper = shallow(
      <StepNavigation
        setStep={setStepSpy}
        steps={steps}
        totalPages={7}
      />);
  })

  afterEach(() => jest.clearAllMocks());

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should execute the onChange function', function () {
    const buttons = wrapper.find(StyledRadioButtonGroup).first().props()
    const mockEvent = {
      target: {
        value: buttons.options[0].id
      }
    }
    buttons.onChange(mockEvent)
    expect(setStepSpy).toHaveBeenCalled()
  })

  it('should move to the beginning', function () {
    const leftButton = wrapper.find(Button).first().props()
    leftButton.onClick()
    expect(setStepSpy).toHaveBeenCalledWith(leftButton['data-index'])
  })

  it('should move back a step', function () {
    const leftButton = wrapper.find(Button).at(1).props()
    leftButton.onClick()
    expect(setStepSpy).toHaveBeenCalledWith(leftButton['data-index'])
  })

  it('should move forward a step', function () {
    const rightButton = wrapper.find(Button).at(2).props()
    rightButton.onClick()
    expect(setStepSpy).toHaveBeenCalledWith(rightButton['data-index'])
  })

  it('should move to the last step', function () {
    const rightButton = wrapper.find(Button).last().props()
    rightButton.onClick()
    expect(setStepSpy).toHaveBeenCalledWith(rightButton['data-index'])
  })

  it('should show ellipses to left and right', function () {
    wrapper.setProps({ activeStep: 3 })
    const ellipses = wrapper.find(Text)
    expect(ellipses.length).toBe(2)
  })
})

describe('StepNavigation with no props', function () {
  it('should return nothing', function () {
    wrapper = shallow(<StepNavigation />)
    expect(wrapper.props()).toEqual({})
  })
})
