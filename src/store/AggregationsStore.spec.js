import { AggregationsStore } from './AggregationsStore'

let aggregationsStore

describe('AggregationsStore', function () {
  beforeEach(function () {
    aggregationsStore = AggregationsStore.create()
  })

  it('should exist', function () {
    expect(aggregationsStore).toBeDefined()
  })

  it('should toggle layout', function () {
    aggregationsStore.toggleModal()
    expect(aggregationsStore.showModal).toBe(true)
  })
})
