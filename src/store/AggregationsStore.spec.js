import { AggregationsStore } from './AggregationsStore'

describe('AggregationsStore', function () {
  let aggregationsStore

  beforeEach(function () {
    aggregationsStore = AggregationsStore.create()
  })

  it('should exist', function () {
    expect(aggregationsStore).toBeDefined()
  })

  it('should toggle modal', function () {
    aggregationsStore.toggleModal()
    expect(aggregationsStore.showModal).toBe(true)
  })
})
