import { shallow } from 'enzyme'
import React from 'react'
import DownloadSetDataContainer from './DownloadSetDataContainer'

let wrapper
const toggleModalSpy = jest.fn()
const contextValues = {
  modal: {
    toggleModal: toggleModalSpy
  }
}

describe('Component > DownloadSetDataContainer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues)
    wrapper = shallow(<DownloadSetDataContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call the toggleModal function', function () {
    wrapper.props().onClick()
    expect(toggleModalSpy).toHaveBeenCalled()
  })
})
