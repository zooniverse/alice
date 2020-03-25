import ASYNC_STATES from 'helpers/asyncStates'
import * as graphQl from 'graphql-request'
import apiClient from 'panoptes-client/lib/api-client.js';
import { mockExtract } from 'helpers/parseTranscriptionData.spec'
import { AppStore } from './AppStore'
import TranscriptionFactory from './factories/transcription'

let rootStore
let transcriptionsStore

const headers = new Headers()
headers.append('last-modified', 'Mon, June 31, 2020');
const patchToveSpy = jest.fn().mockResolvedValue({ ok: true, headers })
const toggleModalSpy = jest.fn()
const getToveResponse = () => Promise.resolve(
  {
    body: JSON.stringify(
      {
        data: TranscriptionFactory.build({
          attributes: {
            locked_by: 'ANOTHER_USER',
            text: { frame0: [{}] }
          }
        }),
        meta: {
          pagination: { last: 1 }
        }
      })
  }
)

const extracts = {
  workflow: {
    extracts: [{
      data: mockExtract,
      userId: '123',
      classificationAt: 1515450629.237
    }]
  }
}

const mockReduction = {
  clusters_text: [],
  clusters_x: [],
  clusters_y: [],
  consensus_score: 0,
  consensus_text: 'Text',
  edited_consensus_text: '',
  extract_index: [],
  flagged: true,
  gold_standard: [],
  gutter_label: 0,
  line_editor: '',
  line_slope: 0,
  low_consensus: false,
  number_views: 0,
  original_transcriber: '',
  seen: false,
  slope_label: 0,
  user_ids: []
}

const mockReaggregation = {
  frame0: [{}],
  low_consensus_lines: 1,
  parameters: {},
  reducer: 'reducer',
  transcribed_lines: 2
}

const user = {
  id: '123',
  display_name: 'A_User'
}

const consoleSpy = jest.spyOn(console, 'warn')
const postCaesarSpy = jest.fn().mockResolvedValue({ body: mockReaggregation })

const multipleTranscriptionsStub = {
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

const aggregatorStub = {
  post: postCaesarSpy
}
const singleTranscriptionStub = {
  get: getToveResponse,
  patch: patchToveSpy
}

const failedToveStub = {
  get: () => Promise.reject({ message: 'Failed to Return' })
}

const failedTovePatch = {
  get: getToveResponse,
  patch: () => Promise.reject({ message: 'Failed to Return' })
}

const failedTovePatchNotOk = {
  get: getToveResponse,
  patch: jest.fn().mockResolvedValue({ ok: false })
}

describe('TranscriptionsStore', function () {
  describe('fetching multiple transcriptions', function () {
    describe('success state', function () {
      beforeEach(async function () {
        rootStore = AppStore.create({
          client: { tove: multipleTranscriptionsStub },
          groups: {
            current: {
              display_name: 'GROUP_1'
            }
          },
          workflows: {
            all: { 1: { id: '1' } },
            current: '1'
          }
        })
        transcriptionsStore = rootStore.transcriptions
        await transcriptionsStore.fetchTranscriptions()
      })

      afterEach(() => jest.clearAllMocks());

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

      it('should not select a transcription without an id', function () {
        transcriptionsStore.selectTranscription()
        expect(transcriptionsStore.current).toBe(undefined)
      })

      it('should toggle the transcription error', function () {
        transcriptionsStore.toggleError()
        expect(transcriptionsStore.showSaveTranscriptionError).toBe(true)
      })

      it('should not delete an inactive transcription line', async function () {
        await transcriptionsStore.selectTranscription(1)
        transcriptionsStore.deleteCurrentLine()
        expect(patchToveSpy).not.toHaveBeenCalled()
      })
    })

    describe('failure state', function () {
      it('should register an error', async function () {
        rootStore = AppStore.create({ client: { tove: failedToveStub }})
        transcriptionsStore = rootStore.transcriptions
        await transcriptionsStore.retrieveTranscriptions()
        expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.ERROR)
        expect(consoleSpy).toHaveBeenCalled()
      })
    })
  })

  describe('fetching a single transcription', function () {
    describe('success state', function () {
      beforeEach(async function () {
        jest
          .spyOn(graphQl, 'request')
          .mockImplementation(() => Promise.resolve(extracts))
        jest
          .spyOn(apiClient, 'type')
          .mockImplementation(() => {
            return {
              get: () => Promise.resolve([user])
            }
          })
        rootStore = AppStore.create({
          auth: { userName: 'A_USER' },
          client: {
            aggregator: aggregatorStub,
            tove: singleTranscriptionStub
          },
          groups: {
            current: {
              display_name: 'GROUP_1'
            }
          },
          subjects: { index: 0 },
          workflows: {
            all: { 1: { id: '1' } },
            current: '1'
          }
        })
        Object.defineProperty(
          rootStore.modal, 'toggleModal',
          { writable: true, value: toggleModalSpy }
        )
        transcriptionsStore = rootStore.transcriptions
        await transcriptionsStore.selectTranscription(1)
      })

      afterEach(() => jest.clearAllMocks());

      it('should return current transcription views', function () {
        expect(transcriptionsStore.approved).toBe(false)
        expect(transcriptionsStore.title).toBe('1')
      })

      it('should set an active transcription', function () {
        transcriptionsStore.setActiveTranscription(1)
        expect(transcriptionsStore.activeTranscriptionIndex).toBe(1)
      })

      it('should edit the text object', function () {
        const textObject = [mockReduction]
        transcriptionsStore.setTextObject([mockReduction])
        expect(transcriptionsStore.current.text.get('frame0')).toEqual(textObject)
      })

      it('should not insert an invalid transcription', function () {
        expect(transcriptionsStore.all.size).toBe(1)
        transcriptionsStore.setTranscription(1)
        expect(consoleSpy).toHaveBeenCalled()
        expect(transcriptionsStore.all.size).toBe(1)
      })

      it('should not attempt to set an empty transcription', function () {
        expect(transcriptionsStore.current.id).toBe("1")
        transcriptionsStore.setTranscription()
        expect(transcriptionsStore.current.id).toBe("1")
      })

      it('should save a transcription', async function () {
        await transcriptionsStore.saveTranscription()
        expect(patchToveSpy).toHaveBeenCalled()
        expect(transcriptionsStore.current.last_modified).toBe('Mon, June 31, 2020')
      })

      it('should update the flagged attribute', function () {
        transcriptionsStore.setTextObject([mockReduction])
        expect(transcriptionsStore.current.flagged).toBe(false)
        transcriptionsStore.checkForFlagUpdate()
        expect(patchToveSpy).toHaveBeenCalled()
        expect(transcriptionsStore.current.flagged).toBe(true)
      })

      it('should update the approval status', async function () {
        await transcriptionsStore.updateApproval(false)
        expect(transcriptionsStore.readyForReview).toBe(true)
      })

      it('should toggle off the approval status', async function () {
        await transcriptionsStore.updateApproval(true)
        expect(transcriptionsStore.readyForReview).toBe(false)
      })

      it('should change the index', function () {
        transcriptionsStore.changeIndex(1)
        expect(transcriptionsStore.index).toBe(1)
      })

      it('should add a transcription line', async function () {
        transcriptionsStore.setTextObject([mockReduction])
        const current = transcriptionsStore.current.text.get('frame0')
        expect(current.length).toBe(1)
        transcriptionsStore.addLine()
        expect(current.length).toBe(2)
        expect(transcriptionsStore.activeTranscriptionIndex).toBe(1)
      })

      it('should show when the transcription is locked', async function () {
        await transcriptionsStore.checkIfLocked()
        expect(toggleModalSpy).toHaveBeenCalled()
      })

      describe('when deleting a line', function () {
        it('should not proceed without an active transcription', function () {
          const current = transcriptionsStore.current.text.get('frame0')
          expect(current.length).toBe(1)
          transcriptionsStore.deleteCurrentLine()
          expect(current.length).toBe(1)
          expect(patchToveSpy).not.toHaveBeenCalled()
        })

        it('should delete a line', function () {
          transcriptionsStore.setActiveTranscription(0)
          const current = transcriptionsStore.current.text.get('frame0')
          expect(current.length).toBe(1)
          transcriptionsStore.deleteCurrentLine()
          expect(current.length).toBe(0)
          expect(patchToveSpy).toHaveBeenCalled()
        })
      })

      describe('and attempting to undo', function () {
        it('should not make a change', function () {
          transcriptionsStore.undo()
          expect(patchToveSpy).not.toHaveBeenCalled()
        })
      })

      describe('and making a change', function () {
        it('should undo the previous action', function () {
          transcriptionsStore.setTextObject([mockReduction])
          transcriptionsStore.undo()
          expect(patchToveSpy).toHaveBeenCalled()
        })
      })

      describe('when reaggregating', function () {
        afterEach(() => jest.clearAllMocks());

        it('should reaggregate DBScan', async function () {
          const params = {
            epsSlope: 1,
            epsLine: 2,
            epsWord: 3,
            gutterTol: 4,
            minSamples: 5,
            minWordCount: 6
          }
          await transcriptionsStore.reaggregateDBScan(params)
          expect(postCaesarSpy).toHaveBeenCalled()
          expect(transcriptionsStore.current.low_consensus_lines).toBe(mockReaggregation.low_consensus_lines)
          expect(patchToveSpy).toHaveBeenCalled()
        })

        it('should reaggregate optics', async function () {
          const params = {
            minSamples: 1,
            xi: 2,
            angleEps: 3,
            gutterEps: 4,
            minLineLength: 5
          }
          await transcriptionsStore.reaggregateOptics(params)
          expect(postCaesarSpy).toHaveBeenCalled()
          expect(transcriptionsStore.current.low_consensus_lines).toBe(mockReaggregation.low_consensus_lines)
          expect(patchToveSpy).toHaveBeenCalled()
        })
      })
    })

    describe('failure state', function () {
      it('should register an error on selecting', async function () {
        rootStore = AppStore.create({ client: { tove: failedToveStub }})
        transcriptionsStore = rootStore.transcriptions
        await transcriptionsStore.selectTranscription(1)
        expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.ERROR)
        expect(consoleSpy).toHaveBeenCalled()
      })

      it('should register an error on patching', async function () {
        rootStore = AppStore.create({
          client: { tove: failedTovePatch },
          workflows: {
            all: { 1: { id: '1' } },
            current: '1'
          }
        })
        transcriptionsStore = rootStore.transcriptions
        await transcriptionsStore.selectTranscription(1)
        await transcriptionsStore.saveTranscription()
        expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.ERROR)
        expect(consoleSpy).toHaveBeenCalled()
      })

      it('should register an error on patching if response not ok', async function () {
        rootStore = AppStore.create({
          client: { tove: failedTovePatchNotOk },
          workflows: {
            all: { 1: { id: '1' } },
            current: '1'
          }
        })
        transcriptionsStore = rootStore.transcriptions
        await transcriptionsStore.selectTranscription(1)
        await transcriptionsStore.saveTranscription()
        expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.ERROR)
        expect(consoleSpy).toHaveBeenCalled()
      })
    })
  })
})
