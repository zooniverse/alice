import { shallow } from 'enzyme'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Flags, StyledFontAwesomeIcon } from './Flags'

let wrapper
const reviewedDatum = { reviewed: true }
const flaggedDatum = { flagged: true }
const goldStandardDatum = { goldStandard: true }

describe('Component > Flags', function () {
  it('should render without crashing', function () {
    wrapper = shallow(<Flags />);
    expect(wrapper).toBeDefined()
  })

  it('should render a "reviewed" flag', function() {
    wrapper = shallow(<Flags datum={reviewedDatum} />)
    const flags = wrapper.find(StyledFontAwesomeIcon)
    expect(flags.length).toBe(1)
    expect(flags.first().props().color).toBe('green')
  })

  it('should render a "flagged" flag', function() {
    wrapper = shallow(<Flags datum={flaggedDatum} />)
    const flags = wrapper.find(StyledFontAwesomeIcon)
    expect(flags.length).toBe(1)
    expect(flags.first().props().color).toBe('tomato')
  })

  it('should render a "gold standard" flag', function() {
    wrapper = shallow(<Flags datum={goldStandardDatum} />)
    const flags = wrapper.find(FontAwesomeIcon)
    expect(flags.length).toBe(1)
    expect(flags.first().props().color).toBe('gold')
  })
})
