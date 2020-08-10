import apiClient from 'panoptes-client/lib/api-client.js';
import TranscriptionFactory from '../factories/transcription'

export const headers = new Headers()
headers.append('last-modified', 'Mon, June 31, 2020');

export const failedToveStub = {
  get: () => Promise.reject({ message: 'Failed to Return' })
}

export const consoleSpy = jest.spyOn(console, 'warn')

export const getToveResponse = () => Promise.resolve(
  {
    body: JSON.stringify(
      {
        data: TranscriptionFactory.build({
          attributes: {
            locked_by: 'A_USER',
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

export const failedTovePatchNotOk = {
  get: getToveResponse,
  patch: jest.fn().mockResolvedValue({ ok: false })
}

export const failedTovePatch = {
  get: getToveResponse,
  patch: () => Promise.reject({ message: 'Failed to Return' })
}
