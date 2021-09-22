import { shallow } from 'enzyme'
import * as React from 'react';
import DeleteModalContainer from './DeleteModalContainer'

let wrapper
const deleteCurrentLineSpy = jest.fn()
const toggleModalSpy = jest.fn()

const context = {
  transcriptions: {
    deleteCurrentLine: deleteCurrentLineSpy
  }
}

describe('Component > DeleteModalContainer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => context)
    wrapper = shallow(<DeleteModalContainer toggleModal={toggleModalSpy} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call deleteCurrentLine', function () {
    wrapper.props().deleteLine()
    expect(deleteCurrentLineSpy).toHaveBeenCalled()
  })

  it('should call toggleModal', function () {
    wrapper.props().toggleModal()
    expect(toggleModalSpy).toHaveBeenCalled()
  })
})
