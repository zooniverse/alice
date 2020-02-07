import { mount, shallow } from 'enzyme'
import React from 'react'
import ASYNC_STATES from 'helpers/asyncStates'
import { Text } from 'grommet'
import { act } from 'react-dom/test-utils'
import { ProjectPageContainer } from './ProjectsPageContainer'
import ProjectCard from './components/ProjectCard'

let wrapper
const getResourcesSpy = jest.fn()
const getProjectsSpy = jest.fn()
const selectProjectSpy = jest.fn()

const collabProjects = [
  {
    id: '1',
    role: 'Volunteer',
    avatar_src: 'www.image.com',
    display_name: 'Fake Project'
  }
]
const ownerProjects = [
  {
    id: '2',
    role: 'Researcher',
    avatar_src: 'www.image.com',
    display_name: 'Fake Project'
  }
]
const fakeUser = { id: 12 }
const contextValues = {
  auth: {
    user: fakeUser
  },
  getResources: getResourcesSpy,
  projects: {
    asyncState: ASYNC_STATES.IDLE,
    collabProjects,
    getProjects: getProjectsSpy,
    selectProject: selectProjectSpy,
    ownerProjects
  }
}

const match = {
  params: {}
}

describe('Component > ProjectPageContainer', function () {
  describe('with props', function () {
    beforeEach(function() {
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      wrapper = shallow(<ProjectPageContainer match={match} />);
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should render without crashing', function () {
      expect(wrapper).toBeDefined()
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
      wrapper = shallow(<ProjectPageContainer />);
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
      wrapper = shallow(<ProjectPageContainer />);
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
      wrapper = shallow(<ProjectPageContainer />);
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
      wrapper = shallow(<ProjectPageContainer />);
      expect(wrapper.find(Text).first().props().children).toBe(
        'We couldn\'t find any transcription projects you participate in.');
    })
  })

  describe('useEffect hook', function () {
    it('should fetch resources', async function () {
      const revisedContext = Object.assign({}, contextValues)
      revisedContext.projects.collabProjects = []
      revisedContext.projects.ownerProjects = []
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => revisedContext )
      wrapper = mount(<ProjectPageContainer match={match} />);
      await act(async () => {
        wrapper.update();
      });
      expect(getResourcesSpy).toHaveBeenCalled()
      expect(getProjectsSpy).toHaveBeenCalled()
    })
  })
})
