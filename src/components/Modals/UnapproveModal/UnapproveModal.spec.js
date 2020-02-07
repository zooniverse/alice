import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import UnapproveModal from './UnapproveModal'

let wrapper
let onCloseSpy = jest.fn()
let onUnapproveSpy = jest.fn()

describe('Component > UnapproveModal', function () {
  beforeAll(function () {
    wrapper = shallow(<UnapproveModal onClose={onCloseSpy} onUnapprove={onUnapproveSpy} />);
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call onClose when x button pressed', function () {
    const xButton = wrapper.find(Button).first()
    xButton.simulate('click')
    expect(onCloseSpy).toHaveBeenCalled()
  })

  it('should call onClose when close button pressed', function () {
    const closeButton = wrapper.find(Button).at(1)
    closeButton.simulate('click')
    expect(onCloseSpy).toHaveBeenCalled()
  })

  it('should call onUnapprove when unapprove button pressed', function () {
    const unapproveButton = wrapper.find(Button).at(2)
    unapproveButton.simulate('click')
    expect(onUnapproveSpy).toHaveBeenCalled()
  })
})
