import React from 'react'
import { shallow } from 'enzyme'
import DeletePageModal from './DeletePageModal'

describe('Component > DeletePageModal', function () {
  let wrapper

  beforeEach(function () {
    wrapper = shallow(<DeletePageModal />);
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
