import { shallow } from 'enzyme'
import React from 'react'
import DownloadDataModalContainer from './DownloadDataModalContainer'

let wrapper
const downloadDataSpy = jest.fn()
const toggleModalSpy = jest.fn()
const contextValues = {
  client: {
    downloadData: downloadDataSpy
  },
  modal: {
    toggleModal: toggleModalSpy
  },
  transcriptions: {
    approvedCount: 0,
    all: new Map()
  }
}

describe('Component > DownloadDataModalContainer', function () {
  beforeEach(function () {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<DownloadDataModalContainer />);
  })

  afterEach(() => jest.clearAllMocks());

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call toggleModal on child onClose', function () {
    wrapper.props().onClose()
    expect(toggleModalSpy).toHaveBeenCalledWith('')
  })

  it('should call downloadData when download clicked', function () {
    wrapper.props().onDownload()
    expect(downloadDataSpy).toHaveBeenCalled()
    expect(toggleModalSpy).toHaveBeenCalledWith('')
  })
})
