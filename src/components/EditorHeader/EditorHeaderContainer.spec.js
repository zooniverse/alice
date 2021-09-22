import { shallow } from 'enzyme'
import * as React from 'react';
import { EditorHeaderContainer } from './EditorHeaderContainer'
import SearchButton from './components/HeaderButton/SearchButtonContainer'
import DownloadSetData from './components/HeaderButton/DownloadSetDataContainer'
import MarkApproved from './components/MarkApproved'
import UndoButton from './components/HeaderButton/UndoButtonContainer'
import LayoutButton from './components/HeaderButton/LayoutButtonContainer'
import MoreButton from './components/MoreButton'
import { EDIT_PATH, PROJECTS_PATH, SUBJECTS_PATH } from 'paths'

let wrapper
const contextValues = {
  aggregations: {
    showModal: false
  },
  auth: {
    user: { id: '1' }
  },
  projects: {
    isViewer: false
  },
  transcriptions: {
    approved: false
  }
}
const EDIT_PATH_HISTORY = {
  location: {
    pathname: EDIT_PATH
  }
}
const SUBJECTS_PATH_HISTORY = {
  location: {
    pathname: SUBJECTS_PATH
  }
}

describe('Component > EditorHeaderContainer', function () {
  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
  })

  it('should render without crashing', function () {
    const history = { location: {} }
    wrapper = shallow(<EditorHeaderContainer history={history} />);
    expect(wrapper).toBeDefined()
  })

  it('should render the correct buttons on the subjects index', function () {
    wrapper = shallow(<EditorHeaderContainer history={SUBJECTS_PATH_HISTORY} />);
    const wrapperButtons = wrapper.find('EditorHeader').props().buttons
    expect(wrapperButtons).toEqual(expect.arrayContaining([DownloadSetData]))
    expect(wrapperButtons).toEqual(expect.arrayContaining([SearchButton]))
  })

  it('should render the correct buttons on the edit page', function () {
    wrapper = shallow(<EditorHeaderContainer history={EDIT_PATH_HISTORY} />);
    const wrapperButtons = wrapper.find('EditorHeader').props().buttons
    expect(wrapperButtons).toEqual(expect.arrayContaining([MarkApproved]))
    expect(wrapperButtons).toEqual(expect.arrayContaining([UndoButton]))
    expect(wrapperButtons).toEqual(expect.arrayContaining([LayoutButton]))
    expect(wrapperButtons).toEqual(expect.arrayContaining([MoreButton]))
  })

  it('should return no buttons without a valid path', function () {
    const history = {
      location: {
        pathname: PROJECTS_PATH
      }
    }
    wrapper = shallow(<EditorHeaderContainer history={history} />);
    const wrapperButtons = wrapper.find('EditorHeader').props().buttons
    expect(wrapperButtons.length).toBe(0)
  })

  describe('when a viewer', function () {
    beforeEach(function() {
      const viewerContext = Object.assign(contextValues, {})
      viewerContext.projects.isViewer = true
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => viewerContext )
    })

    it('should display the correct edit tools', function () {
      wrapper = shallow(<EditorHeaderContainer history={EDIT_PATH_HISTORY} />);
      const wrapperButtons = wrapper.find('EditorHeader').props().buttons
      expect(wrapperButtons.length).toBe(1)
      expect(wrapperButtons).toEqual(expect.arrayContaining([LayoutButton]))
    })

    it('should display the correct subject tools', function () {
      wrapper = shallow(<EditorHeaderContainer history={SUBJECTS_PATH_HISTORY} />);
      const wrapperButtons = wrapper.find('EditorHeader').props().buttons
      expect(wrapperButtons.length).toBe(1)
      expect(wrapperButtons).toEqual(expect.arrayContaining([SearchButton]))
    })
  })
})
