import { shallow } from 'enzyme'
import React from 'react'
import MODALS from 'helpers/modals'
import SearchButtonContainer from './SearchButtonContainer'

describe('Component > SearchButtonContainer', function () {
  let wrapper
  let toggleModalSpy = jest.fn()
  const contextValues = {
    modal: {
      toggleModal: toggleModalSpy,
    }
  }

  beforeEach(function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<SearchButtonContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call toggleModal with child onClick', function () {
    wrapper.props().onClick()
    expect(toggleModalSpy).toHaveBeenCalledWith(MODALS.SEARCH)
  })
})
