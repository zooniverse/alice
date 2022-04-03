import { shallow } from 'enzyme'
import React from 'react'
import { Layer } from 'grommet'
import MODALS from 'helpers/modals'
import ModalManager from './ModalManager'

describe('Component > ModalManager', function () {
  let wrapper
  const contextValues = {
    modal: {
      current: MODALS.SEARCH,
    }
  }

  beforeAll(function () {
    wrapper = shallow(<ModalManager />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render a Layer with modal present', function () {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = shallow(<ModalManager />);
    expect(wrapper.find(Layer).length).toBe(1)
  })
})
