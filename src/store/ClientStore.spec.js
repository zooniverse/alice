import { AppStore } from './AppStore'

describe('ClientStore', function () {
  let clientStore;
  let rootStore;
  let toveGetSpy = jest.fn().mockResolvedValue(new Response())
  const toveZipStub = { get: toveGetSpy }

  beforeEach(function() {
    rootStore = AppStore.create({
      client: { toveZip: toveZipStub },
      groups: {
        current: {
          display_name: 'A_Group'
        }
      },
      transcriptions: {
        all: { 1: { id: '1', text: { 'frame0': [] }}
      },
        current: '1'
      },
      workflows: {
        all: { 1: { id: '1' } },
        current: '1'
      }
    })
    clientStore = rootStore.client
  })

  afterEach(() => jest.clearAllMocks());

  it('should run without crashing', function () {
    expect(clientStore).toBeDefined()
  })

  it('should initialize with the correct values', function () {
    clientStore.initialize()
    expect(clientStore.tove.opts.headers.Accept).toBe('application/json')
    expect(clientStore.tove.opts.mode).toBe('cors')
  })

  it('should set the bearer token', function () {
    clientStore.initialize()
    const token = 'a1b2c3d4'
    clientStore.setBearerToken(token)
    expect(clientStore.tove.opts.headers.Authorization).toBe(`Bearer ${token}`)
  })

  describe('downloading data', function () {
    it('should download transcription data', function () {
      const isEntireGroup = false
      clientStore.downloadData(isEntireGroup)
      expect(toveGetSpy).toHaveBeenCalledWith('/transcriptions/1/export')
    })

    it('should download export data', function () {
      const isEntireGroup = true
      clientStore.downloadData(isEntireGroup)
      expect(toveGetSpy).toHaveBeenCalledWith('/transcriptions/export_group?group_id=A_Group&workflow_id=1')
    })
  })
})
