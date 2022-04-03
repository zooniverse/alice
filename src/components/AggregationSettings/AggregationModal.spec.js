import { mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils';
import AggregationModal from './AggregationModal'

describe('Component > AggregationModal', function () {
  let wrapper
  const contextValues = {
    transcriptions: {
      current: {
        reducer: '',
        parameters: {}
      }
    }
  }

  const refStub = React.createRef()
  refStub.current = { getBoundingClientRect: () => {
    return {
      top: 50,
      width: 100
    }
  } }

  beforeEach(async function() {
    jest
      .spyOn(React, 'useContext')
      .mockImplementation(() => contextValues )
    wrapper = mount(
      <div>
        <AggregationModal ref={refStub} />
      </div>);
    await act(async () => {
      wrapper.update()
    })
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
