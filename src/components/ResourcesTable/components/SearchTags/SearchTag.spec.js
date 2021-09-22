import { shallow } from 'enzyme'
import { Button } from 'grommet'
import SearchTag from './SearchTag'

let wrapper
const clearTagSpy = jest.fn()

describe('Component > SearchTag', function () {
  beforeEach(function() {
    wrapper = shallow(<SearchTag clearTag={clearTagSpy} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should trigger the clearTag prop', function () {
    const closeBtn = wrapper.find(Button).first()
    closeBtn.props().onClick()
    expect(clearTagSpy).toHaveBeenCalled()
  })
})
