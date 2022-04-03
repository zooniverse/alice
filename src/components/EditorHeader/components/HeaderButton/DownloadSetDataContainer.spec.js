import { shallow } from 'enzyme'
import React from 'react'
import DownloadSetDataContainer from './DownloadSetDataContainer'

describe('Component > DownloadSetDataContainer', function () {
  let wrapper
  const toggleModalSpy = jest.fn()
  const contextValues = {
    modal: {
      toggleModal: toggleModalSpy
    },
    transcriptions: {
      approvedCount: 5
    }
  }

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

  describe('with no approved subjects', function () {
    it('should be disabled', function () {
      const context = Object.assign({}, contextValues)
      context.transcriptions.approvedCount = 0
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => context)
      wrapper = shallow(<DownloadSetDataContainer />);
      expect(wrapper.props().disabled).toBe(true)
    })
  })
})
