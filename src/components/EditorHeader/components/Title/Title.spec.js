import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'
import { CapitalText, StyledHeading, Title } from './Title'

let wrapper
const editContext = {
  aggregations: {
    showModal: false
  },
  projects: {
    title: 'Project'
  },
  workflows: {
    title: 'Workflow'
  },
  groups: {
    title: 'Group'
  },
  transcriptions: {
    approvedCount: 0,
    all: { size: 0 },
    title: 'Subject'
  }
}

const pushSpy = jest.fn()

const history = {
  location: {
    pathname: '/projects/123/workflows/123/groups/4/subjects'
  },
  push: pushSpy
}


describe('Component > Title', function () {
  beforeEach(function() {
    wrapper = shallow(<Title />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  describe('when on editor page', function () {
    beforeEach(function() {
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => editContext )
      wrapper = shallow(<Title onEditor />);
    })

    it('Should display only the group subheader', function () {
      expect(wrapper.find(Button).length).toBe(1)
      expect(wrapper.find(StyledHeading).length).toBe(1)
      expect(wrapper.find(StyledHeading).props().children).toBe(editContext.transcriptions.title)
    })
  })

  describe('when on subject page', function () {
    beforeEach(function() {
      let groupContext = Object.assign({}, editContext)
      groupContext.transcriptions.title = ''
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => groupContext )
      wrapper = shallow(<Title history={history} />);
    })

    it('should display three subheader buttons', function () {
      const approvedCount = wrapper.find(CapitalText).last().props()
      expect(wrapper.find(Button).length).toBe(3)
      expect(approvedCount.children).toBe('(0/0 approved)')
    })

    it('should route to the correct subheader location', function () {
      const projectSub = wrapper.find(Button).at(1)
      projectSub.props().onClick()
      expect(pushSpy).toHaveBeenCalledWith('/projects/123/workflows')
    })
  })
})
