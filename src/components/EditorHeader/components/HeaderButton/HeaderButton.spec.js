import { shallow } from 'enzyme'
import HeaderButton from './HeaderButton'

let wrapper

describe('Component > HeaderButton', function () {
  beforeEach(function() {
    wrapper = shallow(<HeaderButton />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
