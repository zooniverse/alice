import ASYNC_STATES from 'helpers/asyncStates'
import mockJWT from 'helpers/mockJWT'
import { AppStore } from './AppStore'
import {
  consoleSpy,
  failedTovePatch,
  failedTovePatchNotOk,
  failedToveStub,
  getToveResponse,
  headers
} from './testUtils/transcriptionsStore'

describe('Store > TranscriptionsStore', function () {
  describe('with a failure', function () {
    describe('when patching a transcription', function () {
      describe('with a rejected response', function () {
        let transcriptionsStore

        beforeEach(async function () {
          jest.useFakeTimers();
          const store = AppStore.create({
            client: {
              tove: mockJWT(failedTovePatch),
              toveZip: mockJWT()
            },
            workflows: {
              all: { 1: { id: '1' } },
              current: '1'
            }
          })
          transcriptionsStore = store.transcriptions
          await transcriptionsStore.selectTranscription(1)
          jest.runOnlyPendingTimers()
          await transcriptionsStore.saveTranscription()
        })

        it('should register an error', async function () {
          jest.runOnlyPendingTimers()
          await transcriptionsStore.saveTranscription()
          expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.ERROR)
          expect(consoleSpy).toHaveBeenCalled()
        })
      })

      describe('with a response that is not ok', function () {
        let transcriptionsStore

        beforeEach(async function () {
          jest.useFakeTimers();
          const store = AppStore.create({
            client: {
              tove: mockJWT(failedTovePatchNotOk),
              toveZip: mockJWT()
            },
            workflows: {
              all: { 1: { id: '1' } },
              current: '1'
            }
          })
          transcriptionsStore = store.transcriptions
          await transcriptionsStore.selectTranscription(1)
          jest.runOnlyPendingTimers()
          await transcriptionsStore.saveTranscription()
        })

        it('should register an error', async function () {
          jest.runOnlyPendingTimers()
          await transcriptionsStore.saveTranscription()
          expect(transcriptionsStore.asyncState).toBe(ASYNC_STATES.ERROR)
          expect(consoleSpy).toHaveBeenCalled()
        })
      })
    })
  })
})
