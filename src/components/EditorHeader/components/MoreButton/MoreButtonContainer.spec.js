import { shallow } from 'enzyme'
import React from 'react'
import MODALS from 'helpers/modals'
import MoreButtonContainer from './MoreButtonContainer'

describe('Component > UndoButton', function () {
  let wrapper
  const toggleModalSpy = jest.fn()
  const contextValues = {
    aggregations: {
      showModal: false
    },
    modal: {
      toggleModal: toggleModalSpy
    },
    transcriptions: {
      approved: false
    }
  }

  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<MoreButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call toggleModal on child toggleDownload', function() {
    wrapper.props().toggleDownload()
    expect(toggleModalSpy).toHaveBeenCalledWith(MODALS.DOWNLOAD_SUBJECT)
  })
})
