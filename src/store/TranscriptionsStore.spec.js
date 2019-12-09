import ASYNC_STATES from 'helpers/asyncStates'
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
          data: [TranscriptionFactory.build(), TranscriptionFactory.build({ id: '2', attributes: { status: 'approved', subject_id: '2' }})]
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
          all: { GROUP_1: { display_name: 'GROUP_1' } },
          current: 'GROUP_1'
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
      expect(transcriptionsStore.all.size).toBe(2)
    })

    it('should count the number of approved', async function () {
      await transcriptionsStore.fetchTranscriptions()
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
          current: 'GROUP_1'
        }
      })
      transcriptionsStore = rootStore.transcriptions
      await transcriptionsStore.selectTranscription(1)
      expect(transcriptionsStore.error).toBe(error.message)
      expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.ERROR)
    })
  })
})
