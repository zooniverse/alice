import { shallow } from 'enzyme'
import React from 'react'
import MODALS from 'helpers/modals'
import ASYNC_STATES from 'helpers/asyncStates'
import { SubjectsPageContainer } from './SubjectsPageContainer'
import ResourcesTable from '../../components/ResourcesTable'

let wrapper
const fetchSubjectSpy = jest.fn()
const fetchTranscriptionsSpy = jest.fn()
const pushSpy = jest.fn()
const selectSubjectSpy = jest.fn()
const toggleModalSpy = jest.fn()
const contextValues = {
  modal: {
    toggleModal: toggleModalSpy
  },
  subjects: {
    fetchSubject: fetchSubjectSpy,
    selectSubject: selectSubjectSpy
  },
  transcriptions: {
    asyncState: ASYNC_STATES.IDLE,
    fetchTranscriptions: fetchTranscriptionsSpy
  }
}
const history = {
  location: {
    pathname: '/projects/123/workflows/123/subject-sets/123/subjects/123/edit'
  },
  push: pushSpy
}
const match = {
  params: {
    project: '123',
    workflow: '123',
    subjectSet: '123',
    subject: '123'
  }
}

describe('Component > SubjectsPageContainer', function () {
  describe('with idle state', function() {
    beforeEach(function() {
      jest.spyOn(React, 'useContext')
        .mockImplementation((context) => contextValues)
      jest.spyOn(React, "useEffect")
        .mockImplementation(f => f());
      wrapper = shallow(<SubjectsPageContainer history={history} match={match} />);
    })

    afterEach(() => jest.clearAllMocks())

    it('should should clear the selected subject on load', function () {
      expect(selectSubjectSpy).toHaveBeenCalledTimes(1)
    })

    it('should render without crashing', function () {
      expect(wrapper).toBeDefined()
    })

    it('should call the child onSelection prop', function () {
      const table = wrapper.find(ResourcesTable).first()
      const subject = { id: 1 }
      table.props().onSelection(subject)
      expect(pushSpy).toHaveBeenCalled()
      expect(fetchSubjectSpy).toHaveBeenCalledWith(subject.id)
    })

    it('should fetch transcriptions when idle', function () {
      expect(fetchTranscriptionsSpy).toHaveBeenCalled()
    })

    it('should toggleModal when subject locked', function() {
      const subject = { id: 1, locked: true }
      const table = wrapper.find(ResourcesTable).first()
      table.props().onSelection(subject)
      expect(toggleModalSpy).toHaveBeenCalledWith(MODALS.LOCKED)
      expect(pushSpy).toHaveBeenCalled()
      expect(fetchSubjectSpy).toHaveBeenCalledWith(subject.id)
    })

    it('should not toggleModal when subject unlocked', function() {
      const subject = { id: 1, locked: false }
      const table = wrapper.find(ResourcesTable).first()
      table.props().onSelection(subject)
      expect(toggleModalSpy).not.toHaveBeenCalled()
      expect(pushSpy).toHaveBeenCalled()
      expect(fetchSubjectSpy).toHaveBeenCalledWith(subject.id)
    })
  })

  it('should not call fetchTranscriptions if already retrieved', function () {
    const copiedContext = Object.assign({}, contextValues)
    copiedContext.transcriptions.asyncState = ASYNC_STATES.READY
    jest.spyOn(React, 'useContext')
      .mockImplementation((context) => copiedContext)
    wrapper = shallow(<SubjectsPageContainer />);
    expect(fetchTranscriptionsSpy).not.toHaveBeenCalled()
  })
})
