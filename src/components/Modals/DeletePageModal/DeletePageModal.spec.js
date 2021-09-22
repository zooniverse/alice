import { shallow } from 'enzyme'
import DeletePageModal from './DeletePageModal'

let wrapper

describe('Component > DeletePageModal', function () {
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
