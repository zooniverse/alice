import { shallow } from 'enzyme'
import React from 'react'
import ASYNC_STATES from 'helpers/asyncStates'
import { Text } from 'grommet'
import ProjectsPageContainer from './ProjectsPageContainer'
import ProjectCard from './components/ProjectCard'

let wrapper
const getProjectsSpy = jest.fn()
const selectProjectSpy = jest.fn()

const collabProjects = [
  {
    id: '1',
    role: 'Moderator',
    avatar_src: 'www.image.com',
    display_name: 'Fake Project'
  }
]
const ownerProjects = [
  {
    id: '2',
    role: 'Project Owner',
    avatar_src: 'www.image.com',
    display_name: 'Fake Project'
  }
]
const fakeUser = { id: 12 }
const contextValues = {
  auth: {
    user: fakeUser
  },
  projects: {
    asyncState: ASYNC_STATES.IDLE,
    getProjects: getProjectsSpy,
    selectProject: selectProjectSpy,
    ownerProjects,
    collabProjects,
  }
}

describe('Component > ProjectsPageContainer', function () {
  describe('with props', function () {
    beforeEach(function() {
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      wrapper = shallow(<ProjectsPageContainer />);
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should render without crashing', function () {
      expect(wrapper).toBeDefined()
    })

    it('should request projects when user and idle state', function () {
      expect(getProjectsSpy).toHaveBeenCalled()
    })

    it('should render owner projects', function () {
      const ownedCard = wrapper.find(ProjectCard).first()
      expect(ownedCard.props().project.role).toBe(ownerProjects[0].role)
    })

    it('should render collaborative projects', function () {
      const collabCard = wrapper.find(ProjectCard).last()
      expect(collabCard.props().project.role).toBe(collabProjects[0].role)
    })
  })

  describe('without props', function () {
    beforeEach(function() {
      const newContext = Object.assign({}, contextValues)
      newContext.auth.user = null
      newContext.projects.ownerProjects = null
      newContext.projects.collabProjects = null
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => newContext )
      wrapper = shallow(<ProjectsPageContainer />);
    })

    it('should not call for projects without a user', function () {
      expect(getProjectsSpy).not.toHaveBeenCalled()
    })

    it('should not load any projects', function () {
      expect(wrapper.find(ProjectCard).length).toBe(0)
      expect(wrapper.find(Text).length).toBe(0)
    })
  })

  describe('error states', function () {
    it('should display a loading spinner', function () {
      const context = {
        auth: {},
        projects: {
          asyncState: ASYNC_STATES.LOADING
        }
      }
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => context )
      wrapper = shallow(<ProjectsPageContainer />);
      expect(wrapper.find(Text).first().props().children).toBe('Loading');
    })

    it('should display an error message', function () {
      const context = {
        auth: {},
        projects: {
          asyncState: ASYNC_STATES.ERROR,
          error: 'THIS IS AN ERROR'
        }
      }
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => context )
      wrapper = shallow(<ProjectsPageContainer />);
      expect(wrapper.find(Text).first().props().children).toBe(context.projects.error);
    })

    it('should display when no projects present', function () {
      const context = {
        auth: {},
        projects: {
          asyncState: ASYNC_STATES.READY,
        }
      }
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => context )
      wrapper = shallow(<ProjectsPageContainer />);
      expect(wrapper.find(Text).first().props().children).toBe(
        'We couldn\'t find any transcription projects you participate in.');
    })
  })

  describe('useEffect hook', function () {
    it('should clear the selected project', function () {
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      jest.spyOn(React, "useEffect")
        .mockImplementation(f => f());
      wrapper = shallow(<ProjectsPageContainer />);
      expect(selectProjectSpy).toHaveBeenCalledTimes(1)
    })
  })
})
