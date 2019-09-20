import { shallow } from 'enzyme'
import React from 'react'
import { Image } from 'grommet'
import ProjectCard from './ProjectCard'

let wrapper

describe('Component > ProjectCard', function () {
  beforeEach(function() {
    wrapper = shallow(<ProjectCard />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should fallback to a default project image', function () {
    const projectImage = wrapper.find(Image);
    expect(projectImage.first().props().src).toBe('simple-pattern.png')
  })
})
