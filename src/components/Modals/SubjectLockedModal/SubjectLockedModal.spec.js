import { shallow } from 'enzyme'
import { Button } from 'grommet'
import SubjectLockedModal from './SubjectLockedModal'

let wrapper
let onBackSpy = jest.fn()

describe('Component > SubjectLockedModal', function () {
  beforeAll(function () {
    wrapper = shallow(<SubjectLockedModal onBack={onBackSpy} />);
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should call the onBack function with button press', function () {
    const backButton = wrapper.find(Button).first()
    backButton.simulate('click')
    expect(onBackSpy).toHaveBeenCalled()
  })
})
