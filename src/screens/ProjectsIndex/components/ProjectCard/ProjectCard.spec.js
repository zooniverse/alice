import { shallow } from 'enzyme'
import React from 'react'
import { Button, Image } from 'grommet'
import ASYNC_STATES from 'helpers/asyncStates'
import { ProjectCard } from './ProjectCard'

let wrapper
const project = {
  avatar_src: 'source.com'
}
const selectProjectSpy = jest.fn()
const setStateSpy = jest.fn()
const history = {
  push: () => {}
}
const contextValues = {
  projects: {
    selectProject: selectProjectSpy,
  },
  workflows: {
    setState: setStateSpy
  }
}


describe('Component > ProjectCard', function () {
  beforeEach(function() {
    jest.spyOn(React, 'useContext')
      .mockImplementation((context) => contextValues)
    wrapper = shallow(<ProjectCard />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should fallback to a default project image', function () {
    const projectImage = wrapper.find(Image);
    expect(projectImage.first().props().src).toBe('simple-pattern.png')
  })

  it('should format the project src correctly', function () {
    wrapper = shallow(<ProjectCard project={project} />);
    expect(wrapper.find(Image).first().props().src).toBe(`//${project.avatar_src}`)
  })

  it('should call store functions with onClick', function () {
    wrapper = shallow(<ProjectCard history={history} project={project} />);
    const button = wrapper.find(Button).first()
    button.simulate('click')
    expect(selectProjectSpy).toHaveBeenCalledWith(project)
    expect(setStateSpy).toHaveBeenCalledWith(ASYNC_STATES.IDLE)
  })
})
