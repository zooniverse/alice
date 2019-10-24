import { shallow } from 'enzyme'
import React from 'react'
import MoreButtonContainer from './MoreButtonContainer'

let wrapper
const toggleModalSpy = jest.fn()
const contextValues = {
  modal: {
    toggleModal: toggleModalSpy
  }
}

describe('Component > UndoButton', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<MoreButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call toggleModal on child toggleDownload', function() {
    wrapper.props().toggleDownload()
    expect(toggleModalSpy).toHaveBeenCalledWith('download')
  })
})
