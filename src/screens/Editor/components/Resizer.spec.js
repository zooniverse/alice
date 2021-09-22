import { shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import 'jest-styled-components'
import Resizer, { StyledBox } from './Resizer'

let wrapper

describe('Component > Resizer', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<Resizer />);
    expect(wrapper).toBeDefined()
  })

  it('should show a column resizer', function () {
    wrapper = shallow(<Resizer direction='row' />);
    const Box = wrapper.find(StyledBox).first()
    const group = renderer.create(Box).toJSON()
    expect(group).toHaveStyleRule('cursor', 'col-resize', {
      modifier: ':hover'
    })
  })

  it('should show a row resizer', function () {
    wrapper = shallow(<Resizer direction='column' />);
    const Box = wrapper.find(StyledBox).first()
    const group = renderer.create(Box).toJSON()
    expect(group).toHaveStyleRule('cursor', 'row-resize', {
      modifier: ':hover'
    })
  })

  it('should show a disabled resizer', function () {
    wrapper = shallow(<Resizer disabled />);
    const Box = wrapper.find(StyledBox).first()
    const group = renderer.create(Box).toJSON()
    expect(group).toHaveStyleRule('cursor', 'default', {
      modifier: ':hover'
    })
  })
})
