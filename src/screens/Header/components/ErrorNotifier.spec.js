import { shallow } from 'enzyme'
import { Text } from 'grommet'
import ErrorNotifier, { CapitalText } from './ErrorNotifier'

let wrapper

describe('Component > ErrorNotifier', function () {
  it('should show an error', function () {
    const error = { message: 'A Message', help: 'Some Help' }
    wrapper = shallow(
      <ErrorNotifier
        error={error}
        showNotifier={true}
      />);
    const header = wrapper.find(CapitalText).first()
    const text = wrapper.find(Text).first()
    expect(header.props().children).toBe(error.message)
    expect(text.props().children).toBe(error.help)
  })

  it('should hide the notifier', function () {
    wrapper = shallow(<ErrorNotifier />);
    expect(wrapper).toEqual({})
  })
})
