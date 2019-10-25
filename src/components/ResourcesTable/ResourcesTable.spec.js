import { shallow } from 'enzyme'
import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import { DataTable } from 'grommet'
import ResourcesTable, { ResourcesTable as UnwrappedTable } from './ResourcesTable'

let wrapper;
let html;
const onSelectionSpy = jest.fn()
const pushSpy = jest.fn()

const history = {
  location: { pathname: '/projects' },
  push: pushSpy
}

const COLUMNS = [
  {
    property: "firstColumn",
    header: "First Column"
  },
  {
    property: "secondColumn",
    header: "Second Column",
  },
]

const DATA = [
  {
    id: '1',
    firstColumn: "First Item",
    secondColumn: "Second Item"
  },
  {
    id: '2',
    firstColumn: "First Item",
    secondColumn: "Second Item"
  }
]

describe('Component > ResourcesTable', function () {
  beforeEach(function() {
    wrapper = shallow(
      <BrowserRouter>
        <ResourcesTable columns={COLUMNS} data={DATA} />
      </BrowserRouter>);
    html = wrapper.html()
  })

  it('should render without crashing', function () {
    expect(wrapper).toBeDefined()
  })

  it('should render the correct columns', function () {
    expect(html).toContain(COLUMNS[0].header);
    expect(html).toContain(COLUMNS[1].header);
  })

  it('should render the correct data', function () {
    expect(html).toContain(DATA[0].firstColumn);
    expect(html).toContain(DATA[0].secondColumn);
    expect(html).toContain(DATA[1].firstColumn);
    expect(html).toContain(DATA[1].secondColumn);
  })
})

describe('ResourcesTable functions', function () {
  beforeEach(function () {
    wrapper = shallow(<UnwrappedTable columns={COLUMNS} data={DATA} history={history} />)
  })

  it('should push a link to the history object', function () {
    const mockEvent = {
      datum: { link: '/123' },
      target: { type: 'box' }
    }
    const table = wrapper.find(DataTable).first().props()
    table.onClickRow(mockEvent)
    expect(pushSpy).toHaveBeenCalledWith('/projects/123')
  })

  it('should check all boxes with onCheckAll', function () {
    const mockEvent = {
      target: { checked: true }
    }
    const columns = wrapper.find(DataTable).props().columns[0];
    const checkBox = columns.header.props.children.props
    checkBox.onChange(mockEvent)
    wrapper.update()
    const checkedItems = wrapper.state().checked
    expect(checkedItems).toEqual([DATA[0].id, DATA[1].id])
  })

  it('should check a single box with onCheck', function () {
    const mockEvent = {
      target: { checked: true }
    }
    const columns = wrapper.find(DataTable).props().columns[0]
    const checkboxColumn = columns.render(DATA[0]);
    const checkboxChild = checkboxColumn.props.children
    checkboxChild.props.onChange(mockEvent);
    wrapper.update()
    expect(wrapper.state().checked).toStrictEqual([DATA[0].id])
  })

  it('should uncheck an item with onCheck', function () {
    const mockEvent = {
      target: { checked: false }
    }
    wrapper.setState({ checked: [DATA[0].id] })
    const columns = wrapper.find(DataTable).props().columns[0]
    const checkboxColumn = columns.render(DATA[0]);
    const checkboxChild = checkboxColumn.props.children
    checkboxChild.props.onChange(mockEvent);
    wrapper.update()
    expect(wrapper.state().checked.length).toBe(0)
  })
})

describe('ResourcesTable onSelection prop', function () {
  beforeEach(function () {
    wrapper = shallow(<UnwrappedTable columns={COLUMNS} data={DATA} onSelection={onSelectionSpy} />)
  })

  it('should call the onSelection prop', function () {
    const mockEvent = {
      datum: { link: '/123' },
      target: { type: 'box' }
    }
    const table = wrapper.find(DataTable).first().props()
    table.onClickRow(mockEvent)
    expect(onSelectionSpy).toHaveBeenCalledWith(mockEvent.datum)
  })
})
