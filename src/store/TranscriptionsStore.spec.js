import ASYNC_STATES from 'helpers/asyncStates'
import { TranscriptionsStore } from './TranscriptionsStore'
import { AppStore } from './AppStore'
import TranscriptionFactory from './factories/transcription'

let transcriptionsStore
let rootStore
let simpleTranscription = TranscriptionFactory.build({ status: 'approved' })

let toveStub = {
  get: () => Promise.resolve(
    {
      body: JSON.stringify(
        {
          data: [simpleTranscription, TranscriptionFactory.build()]
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

    it('should count the number of approved', function () {
      transcriptionsStore = TranscriptionsStore.create({
        all: [TranscriptionFactory.build({ status: 'approved' }), TranscriptionFactory.build()]
      })
      expect(transcriptionsStore.approvedCount).toBe(1)
    })

    it('should fetch transcriptions for a subject', async function () {
      await transcriptionsStore.fetchTranscriptionsForSubject(1)
      const transcription = transcriptionsStore.createTranscription(simpleTranscription)
      expect(transcriptionsStore.current).toEqual(transcription)
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
