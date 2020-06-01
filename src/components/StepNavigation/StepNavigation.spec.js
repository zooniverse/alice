import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import StepNavigation, { StyledRadioButtonGroup } from './StepNavigation'

let wrapper
const setStepSpy = jest.fn()
const steps = [1, 2, 3]

describe('Component > StepNavigation', function () {
  beforeEach(function() {
    wrapper = shallow(
      <StepNavigation
        setStep={setStepSpy}
        steps={steps}
        totalPages={3}
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
})

describe('StepNavigation with no props', function () {
  it('should return nothing', function () {
    wrapper = shallow(<StepNavigation />)
    expect(wrapper.props()).toEqual({})
  })
})
