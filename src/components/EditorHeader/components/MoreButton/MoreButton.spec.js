import { shallow } from 'enzyme'
import React from 'react'
import MoreButton from './MoreButton'

let wrapper
let setOpenSpy = jest.fn()
let toggleDownloadSpy = jest.fn()
let toggleModalSpy = jest.fn()
const contextValues = {
  aggregations: {
    toggleModal: toggleModalSpy
  }
}

describe('Component > UndoButton', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<MoreButton setOpen={setOpenSpy} toggleDownload={toggleDownloadSpy} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  afterEach(() => jest.clearAllMocks());

  it('should call onDownload when download data clicked', function () {
    const content = wrapper.props().dropContent;
    const contentChildren = content.props.children
    const downloadButton = shallow(contentChildren[0])
    downloadButton.props().onClick()
    expect(setOpenSpy).toHaveBeenCalledWith(false)
  })

  it('should call onEditSettings when edit aggregation settings clicked', function () {
    const content = wrapper.props().dropContent;
    const contentChildren = content.props.children
    const editSettings = shallow(contentChildren[1])
    editSettings.props().onClick()
    expect(toggleModalSpy).toHaveBeenCalledTimes(1)
    expect(setOpenSpy).toHaveBeenCalledWith(false)
  })

  it('should call the setOpen function onClose', function() {
    wrapper.props().onClose()
    expect(setOpenSpy).toHaveBeenCalledWith(false)
  })

  it('should call the setOpen function onOpen', function() {
    wrapper.props().onOpen()
    expect(setOpenSpy).toHaveBeenCalledWith(true)
  })

  it('should set the icon to FormDown when open', function() {
    wrapper = shallow(<MoreButton isOpen={true} />)
    const html = wrapper.html()
    expect(html).toContain('FormDown')
  })
})
