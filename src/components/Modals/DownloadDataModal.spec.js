import { shallow } from 'enzyme'
import React from 'react'
import DownloadDataModal from './DownloadDataModal'

let wrapper

describe('Component > DownloadDataModal', function () {
  beforeAll(function () {
    wrapper = shallow(<DownloadDataModal />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
