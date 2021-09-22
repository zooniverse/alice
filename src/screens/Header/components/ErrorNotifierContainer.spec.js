import { shallow } from 'enzyme'
import ErrorNotifierContainer from './ErrorNotifierContainer'

let wrapper

describe('Component > ErrorNotifierContainer', function () {
  beforeEach(function() {
    wrapper = shallow(<ErrorNotifierContainer />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
