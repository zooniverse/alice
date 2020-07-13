import ASYNC_STATES from 'helpers/asyncStates'
import * as graphQl from 'graphql-request'
import apiClient from 'panoptes-client/lib/api-client.js';
import { mockExtract } from 'helpers/parseTranscriptionData.spec'
import mockJWT from 'helpers/mockJWT'
import STATUS from 'helpers/status'
import { AppStore } from './AppStore'
import TranscriptionFactory from './factories/transcription'

const headers = new Headers()
headers.append('last-modified', 'Mon, June 31, 2020');

const failedToveStub = {
  get: () => Promise.reject({ message: 'Failed to Return' })
}

const consoleSpy = jest.spyOn(console, 'warn')

const getToveResponse = () => Promise.resolve(
  {
    body: JSON.stringify(
      {
        data: TranscriptionFactory.build({
          attributes: {
            locked_by: 'ANOTHER_USER',
            text: {
              frame0: [{ line_slope: 0, slope_label: 0 }, { line_slope: 90, slope_label: 1 }],
              frame1: [{ line_slope: 0, slope_label: 0 }, { line_slope: 90, slope_label: 1 }]
            }
          }
        }),
        meta: {
          pagination: { last: 1 }
        }
      }),
    headers
  }
)

const failedTovePatchNotOk = {
  get: getToveResponse,
  patch: jest.fn().mockResolvedValue({ ok: false })
}

const failedTovePatch = {
  get: getToveResponse,
  patch: () => Promise.reject({ message: 'Failed to Return' })
}

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
