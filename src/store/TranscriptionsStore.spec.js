import ASYNC_STATES from 'helpers/asyncStates'
import { AppStore } from './AppStore'
import TranscriptionFactory from './factories/transcription'

let transcriptionsStore
let rootStore

let toveStub = {
  get: () => Promise.resolve(
    {
      body: JSON.stringify(
        {
          data: [TranscriptionFactory.build(), TranscriptionFactory.build()]
        })
    }
  )
}
const error = { message: 'Failed to Return' }
let failedToveStub = {
  get: () => Promise.reject(error)
}

describe('TranscriptionsStore', function () {
  describe('success state', function () {
    beforeEach(function () {
      rootStore = AppStore.create({
        client: { tove: toveStub },
        groups: {
          current: {
            display_name: 'GROUP_1'
          }
        }
      })
      transcriptionsStore = rootStore.transcriptions
    })

    it('should exist', function () {
      expect(transcriptionsStore).toBeDefined()
    })

    it('should fetch transcriptions', async function () {
      await transcriptionsStore.fetchTranscriptions()
      expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.READY)
      expect(transcriptionsStore.all.length).toBe(2)
    })
  })

  describe('failure state', function () {
    it('should handle an error when fetching transcriptions', async function () {
      rootStore = AppStore.create({
        client: { tove: failedToveStub },
        groups: {
          current: {
            display_name: 'GROUP_1'
          }
        }
      })
      transcriptionsStore = rootStore.transcriptions
      await transcriptionsStore.fetchTranscriptions()
      expect(transcriptionsStore.error).toBe(error.message)
      expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.ERROR)
    })
  })
})
