import { shallow } from 'enzyme'
import React from 'react'
import StepNavigation, { StyledButton, StyledRadioButtonGroup } from './StepNavigation'

let wrapper
const setStepSpy = jest.fn()
const steps = ['one', 'two', 'three']

describe('Component > StepNavigation', function () {
  beforeEach(function() {
    wrapper = shallow(
      <StepNavigation
        setStep={setStepSpy}
        steps={steps}
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
    expect(setStepSpy).toHaveBeenCalledWith(0)
  })

  it('should move back a step', function () {
    const leftButton = wrapper.find(StyledButton).first().props()
    leftButton.onClick()
    expect(setStepSpy).toHaveBeenCalledWith(leftButton['data-index'])
  })

  it('should move forward a step', function () {
    const rightButton = wrapper.find(StyledButton).last().props()
    rightButton.onClick()
    expect(setStepSpy).toHaveBeenCalledWith(rightButton['data-index'])
  })
})

describe('StepNavigation with no props', function () {
  it('should return nothing', function () {
    wrapper = shallow(<StepNavigation />)
    expect(wrapper.props()).toEqual({})
  })
})
