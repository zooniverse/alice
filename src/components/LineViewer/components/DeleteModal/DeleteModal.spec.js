import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import DeleteModal from './DeleteModal'

describe('Component > DeleteModal', function () {
  let wrapper
  const deleteLineSpy = jest.fn()
  const toggleModalSpy = jest.fn()

  beforeEach(function () {
    wrapper = shallow(
      <DeleteModal
        deleteLine={deleteLineSpy}
        toggleModal={toggleModalSpy}
      />)
  })

  afterEach(() => jest.clearAllMocks());

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should toggle the modal on cancel', function () {
    const cancelBtn = wrapper.find(Button).first()
    cancelBtn.simulate('click')
    expect(toggleModalSpy).toHaveBeenCalled()
  })

  it('should delete the ine on line deletion', function () {
    const deleteBtn = wrapper.find(Button).last()
    deleteBtn.simulate('click')
    expect(toggleModalSpy).toHaveBeenCalled()
    expect(deleteLineSpy).toHaveBeenCalled()
  })
})
