import { shallow } from 'enzyme'
import React from 'react'
import { Heading } from 'grommet'
import Title, { CapitalText } from './Title'

let wrapper
const editContext = {
  projects: {
    title: 'Project'
  },
  workflows: {
    title: 'Workflow'
  },
  groups: {
    title: 'Group'
  },
  subjects: {
    title: 'Subject'
  },
  transcriptions: {
    approvedCount: 0,
    all: []
  }
}


describe('Component > UndoButton', function () {
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
      expect(wrapper.find(CapitalText).length).toBe(1)
      expect(wrapper.find(Heading).props().children).toBe(editContext.subjects.title)
    })
  })

  describe('when on groups page', function () {
    beforeEach(function() {
      let groupContext = Object.assign({}, editContext)
      groupContext.subjects.title = ''
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => groupContext )
      wrapper = shallow(<Title />);
    })

    it('should display three capital text components', function () {
      const approvedCount = wrapper.find(CapitalText).last().props()
      expect(wrapper.find(CapitalText).length).toBe(3)
      expect(approvedCount.children).toBe('(0/0 approved)')
    })
  })
})
