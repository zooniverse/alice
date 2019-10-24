import { shallow } from 'enzyme'
import React from 'react'
import { Button } from 'grommet'

import DownloadDataModal from './DownloadDataModal'

let wrapper
const onCloseSpy = jest.fn()

describe('Component > DownloadDataModal', function () {
  beforeEach(function () {
    wrapper = shallow(<DownloadDataModal onClose={onCloseSpy} />);
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call the onClose function on X icon press', function() {
    const xButton = wrapper.find(Button).first()
    xButton.simulate('click')
    expect(onCloseSpy).toHaveBeenCalled()
  })

  it('should call the onClose function on "close" press', function() {
    const closeButton = wrapper.find(Button).at(1)
    closeButton.simulate('click')
    expect(onCloseSpy).toHaveBeenCalled()
  })
})
