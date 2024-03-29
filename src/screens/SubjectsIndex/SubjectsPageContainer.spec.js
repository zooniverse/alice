import { mount, shallow } from 'enzyme'
import React from 'react'
import MODALS from 'helpers/modals'
import ASYNC_STATES from 'helpers/asyncStates'
import { act } from 'react-dom/test-utils'
import { BrowserRouter as Router } from 'react-router-dom';
import { SubjectsPageContainer } from './SubjectsPageContainer'
import ResourcesTable from '../../components/ResourcesTable'

describe('Component > SubjectsPageContainer', function () {
  let wrapper
  const getResourcesSpy = jest.fn()
  const fetchTranscriptionsSpy = jest.fn()
  const pushSpy = jest.fn()
  const resetSpy = jest.fn()
  const toggleModalSpy = jest.fn()
  const contextValues = {
    auth: { userName: 'A_USER' },
    getResources: getResourcesSpy,
    modal: {
      toggleModal: toggleModalSpy
    },
    search: {
      active: false,
      reset: resetSpy
    },
    transcriptions: {
      all: { values: () => [] },
      asyncState: ASYNC_STATES.IDLE,
      fetchTranscriptions: fetchTranscriptionsSpy,
      totalPages: 8
    }
  }
  const history = {
    location: {
      pathname: '/projects/123/workflows/123/groups/123/subjects/123/edit'
    },
    push: pushSpy
  }
  const match = {
    params: {
      project: '123',
      workflow: '123',
      group: '123',
      subject: '123'
    }
  }

  describe('with idle state', function() {
    beforeEach(function() {
      jest.spyOn(React, 'useContext')
        .mockImplementation((context) => contextValues)
      wrapper = shallow(<SubjectsPageContainer history={history} match={match} />);
    })

    afterEach(() => jest.clearAllMocks())

    it('should render without crashing', function () {
      expect(wrapper).toBeDefined()
    })

    it('should call the child onSelection prop', function () {
      const table = wrapper.find(ResourcesTable).first()
      const subject = { id: 1 }
      table.props().onSelection(subject)
      expect(pushSpy).toHaveBeenCalled()
    })

    it('should slice pages to the next step', function () {
      const table = wrapper.find(ResourcesTable).first()
      table.props().setStep(1)
      expect(fetchTranscriptionsSpy).toHaveBeenCalledWith(1)
    })

    it('should slice pages to the final step', function () {
      const table = wrapper.find(ResourcesTable).first()
      table.props().setStep(7)
      expect(fetchTranscriptionsSpy).toHaveBeenCalledWith(7)
    })

    it('should not toggleModal when subject unlocked', function() {
      const subject = { id: 1, locked: false }
      const table = wrapper.find(ResourcesTable).first()
      table.props().onSelection(subject)
      expect(toggleModalSpy).not.toHaveBeenCalled()
      expect(pushSpy).toHaveBeenCalled()
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

  describe('useEffect hook', function () {
    it('should fetch resources', async function () {
      jest
        .spyOn(React, 'useContext')
        .mockImplementation(() => contextValues )
      wrapper = mount(
        <Router>
          <SubjectsPageContainer match={match} />
        </Router>);
      await act(async () => {
        wrapper.update();
      });
      expect(getResourcesSpy).toHaveBeenCalled()
      expect(fetchTranscriptionsSpy).toHaveBeenCalled()
    })
  })
})
