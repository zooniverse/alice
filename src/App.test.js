import * as React from 'react';
import { mount, shallow } from 'enzyme'
import apiClient from 'panoptes-client/lib/api-client';
import { act } from 'react-dom/test-utils'
import { App } from './App'

let wrapper
const setBearerTokenSpy = jest.fn()

const contextValues = {
  client: {
    setBearerToken: setBearerTokenSpy
  },
  initialize: () => {},
  initialized: true
}

describe('App', function () {
  it('should render without crashing', function () {
    jest.spyOn(React, 'useContext').mockImplementation((context) => contextValues)
    wrapper = shallow(<App />);
    expect(wrapper).toBeDefined()
  })

  describe('when not initialized', function () {
    beforeEach(function() {
      const revisedContext = Object.assign({}, contextValues)
      revisedContext.initialized = false
      jest.spyOn(React, 'useContext').mockImplementation((context) => revisedContext)
    })

    it('should render nothing when not initialized', function () {
      wrapper = shallow(<App />);
      expect(wrapper.getElement()).toBe(null)
    })

    it('should check the token before each request', async function () {
      wrapper = mount(<App />);
      await act(async () => {
        apiClient.beforeEveryRequest()
        wrapper.update();;
      });
      expect(setBearerTokenSpy).toHaveBeenCalled()
    })
  })
})
