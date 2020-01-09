import { AggregationsStore } from './AggregationsStore'

let aggregationsStore

describe('AggregationsStore', function () {
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

  it('should toggle the transcription pane', function () {
    aggregationsStore.setActiveTranscription()
    expect(aggregationsStore.showTranscription).toBe(true)
  })
})
