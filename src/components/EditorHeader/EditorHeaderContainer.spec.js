import { shallow } from 'enzyme'
import React from 'react'
import EditorHeaderContainer from './EditorHeaderContainer'
import SearchButton from './components/HeaderButton/SearchButtonContainer'
import DownloadSetData from './components/HeaderButton/DownloadSetDataContainer'
import MarkApproved from './components/MarkApproved'
import UndoButton from './components/HeaderButton/UndoButtonContainer'
import SaveButton from './components/HeaderButton/SaveButtonContainer'
import LayoutButton from './components/HeaderButton/LayoutButtonContainer'
import MoreButton from './components/HeaderButton/MoreButtonContainer'
import { SUBJECTS_PATH, EDIT_PATH } from 'paths'

let wrapper
let windowSpy

describe('Component > EditorHeaderContainer', function () {
  beforeEach(function() {
    windowSpy = jest.spyOn(global, 'window', 'get')
  })

  afterEach(() => {
    windowSpy.mockRestore()
  })

  it('should render without crashing', function () {
    wrapper = shallow(<EditorHeaderContainer />);
    expect(wrapper).toBeDefined()
  })

  it('should render the correct buttons on the subjects index', function () {
    windowSpy.mockImplementation(() => ({
      location: {
        pathname: SUBJECTS_PATH
      }
    }))
    wrapper = shallow(<EditorHeaderContainer />);
    const wrapperButtons = wrapper.find('EditorHeader').props().buttons
    expect(wrapperButtons).toEqual(expect.arrayContaining([DownloadSetData]))
    expect(wrapperButtons).toEqual(expect.arrayContaining([SearchButton]))
  })

  it('should render the correct buttons on the edit page', function () {
    windowSpy.mockImplementation(() => ({
      location: {
        pathname: EDIT_PATH
      }
    }))
    wrapper = shallow(<EditorHeaderContainer />);
    const wrapperButtons = wrapper.find('EditorHeader').props().buttons
    expect(wrapperButtons).toEqual(expect.arrayContaining([MarkApproved]))
    expect(wrapperButtons).toEqual(expect.arrayContaining([UndoButton]))
    expect(wrapperButtons).toEqual(expect.arrayContaining([SaveButton]))
    expect(wrapperButtons).toEqual(expect.arrayContaining([LayoutButton]))
    expect(wrapperButtons).toEqual(expect.arrayContaining([MoreButton]))
  })
})
