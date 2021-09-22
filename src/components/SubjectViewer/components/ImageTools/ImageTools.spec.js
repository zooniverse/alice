import { shallow } from 'enzyme'
import ImageTools from './ImageTools'

let wrapper

describe('Component > ImageTools', function () {
  beforeEach(function() {
    wrapper = shallow(<ImageTools />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })
})
