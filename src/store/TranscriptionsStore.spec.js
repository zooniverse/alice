import ASYNC_STATES from 'helpers/asyncStates'
import { AppStore } from './AppStore'
import TranscriptionFactory from './factories/transcription'

let transcriptionsStore
let rootStore
let patchToveSpy = jest.fn().mockResolvedValue(true)
let simpleTranscription = TranscriptionFactory.build({ status: 'approved' })
let mockReduction = {
  clusters_text: [],
  clusters_x: [],
  clusters_y: [],
  consensus_score: 0,
  consensus_text: 'Text',
  edited_consensus_text: '',
  extract_index: [],
  flagged: false,
  gold_standard: [],
  gutter_label: 0,
  line_slope: 0,
  low_consensus: false,
  number_views: 0,
  seen: false,
  slope_label: 0,
  user_ids: []
}

let successfulToveStub = {
  get: () => Promise.resolve(
    {
      body: JSON.stringify(
        {
          data: [TranscriptionFactory.build(), TranscriptionFactory.build({ id: '2', attributes: { status: 'approved', subject_id: '2', text: new Map() }})],
          meta: {
            pagination: { last: 1 }
          }
        })
    }
  ),
  patch: patchToveSpy
}

let singleTranscriptionStub = {
  get: () => Promise.resolve(
    {
      body: JSON.stringify(
        {
          data: TranscriptionFactory.build(),
          meta: {
            pagination: { last: 1 }
          }
        })
    }
  ),
  patch: () => Promise.resolve()
}
const error = { message: 'Failed to Return' }
let failedToveStub = {
  get: () => Promise.reject(error)
}

describe('TranscriptionsStore', function () {
  describe('success state fetching multiple transcriptions', function () {
    beforeEach(async function () {
      rootStore = AppStore.create({
        client: { tove: successfulToveStub },
        groups: {
          current: {
            display_name: 'GROUP_1'
          }
        }
      })
      transcriptionsStore = rootStore.transcriptions
      await transcriptionsStore.fetchTranscriptions()
    })

    it('should exist', function () {
      expect(transcriptionsStore).toBeDefined()
    })

    it('should fetch transcriptions', async function () {
      expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.READY)
      expect(transcriptionsStore.all.size).toBe(2)
    })

    it('should count the number of approved', async function () {
      expect(transcriptionsStore.approvedCount).toBe(1)
    })

    it('should fetch transcriptions for a subject', async function () {
      await transcriptionsStore.selectTranscription(1)
      const transcription = transcriptionsStore.createTranscription(simpleTranscription)
      expect(transcriptionsStore.current).toEqual(transcription)
    })

    it('should return the current transcription state', async function () {
      await transcriptionsStore.selectTranscription(1)
      expect(transcriptionsStore.approved).toBe(false)
      expect(transcriptionsStore.title).toBe("1")
    })

    it('should set the active transcription', function () {
      transcriptionsStore.setActiveTranscription(5)
      expect(transcriptionsStore.activeTranscriptionIndex).toBe(5)
    })

    it('should set the text object', async function () {
      await transcriptionsStore.fetchTranscriptions()
      await transcriptionsStore.selectTranscription(1)
      const textObject = [mockReduction]
      transcriptionsStore.setTextObject(textObject)
      expect(transcriptionsStore.current.text.get('frame0')).toEqual(textObject)
    })

    it('should save a transcription', async function () {
      await transcriptionsStore.fetchTranscriptions()
      await transcriptionsStore.selectTranscription(1)
      await transcriptionsStore.saveTranscription()
      expect(patchToveSpy).toHaveBeenCalled()
    })
  })

  describe('success state fetching single transcription', function () {
    it('should fetch a single transcription', async function () {
      rootStore = AppStore.create({
        client: { tove: singleTranscriptionStub },
        groups: {
          current: {
            display_name: 'GROUP_1'
          }
        }
      })
      transcriptionsStore = rootStore.transcriptions
      const returnValue = await transcriptionsStore.fetchTranscription('1')
      expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.READY)
      expect(returnValue).toBeDefined()
    })

    it('should be able to update an approval state', async function () {
      await transcriptionsStore.selectTranscription(1)
      await transcriptionsStore.updateApproval(false)
      expect(transcriptionsStore.readyForReview).toBe(true)
    })
  })

  describe('failure state', function () {
    beforeEach(function() {
      rootStore = AppStore.create({
        client: { tove: failedToveStub },
        groups: {
          current: {
            display_name: 'GROUP_1'
          }
        }
      })
    })

    it('should not set a workflow if give the wrong info', function () {
      transcriptionsStore = rootStore.transcriptions
      expect(transcriptionsStore.all.size).toBe(0)
      transcriptionsStore.setTranscription(1)
      expect(transcriptionsStore.all.size).toBe(0)
    })

    it('should handle an error when fetching transcriptions', async function () {
      transcriptionsStore = rootStore.transcriptions
      await transcriptionsStore.fetchTranscriptions()
      expect(transcriptionsStore.error).toBe(error.message)
      expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.ERROR)
    })
  })
})
