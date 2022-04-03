import apiClient from 'panoptes-client/lib/api-client.js'
import ASYNC_STATES from 'helpers/asyncStates'
import { AppStore } from './AppStore'
import { Subject } from './SubjectStore'

describe('SubjectStore', function () {
  let subjectStore

  const mockSubject = {
    id: '1',
    locations: [],
    metadata: {}
  }

  beforeEach(function () {
    jest
      .spyOn(apiClient, 'type')
      .mockImplementation(() => {
        return {
          get: () => Promise.resolve([mockSubject])
        }
      })
    const rootStore = AppStore.create({})
    subjectStore = rootStore.subjects
  })

  it('should exist', function () {
    expect(subjectStore).toBeDefined()
  })

  it('should set the subject', async function () {
    await subjectStore.fetchSubject('1')
    expect(subjectStore.current).toEqual(mockSubject)
    expect(subjectStore.error).toBe('')
    expect(subjectStore.asyncState).toBe(ASYNC_STATES.READY)
  })

  describe('Title view', function () {
    it('should return a default title', function () {
      expect(subjectStore.title).toBe('')
    })

    it('should set the subject title', function () {
      const subject = Subject.create({ id: '10' })
      subjectStore.selectSubject(subject)
      expect(subjectStore.title).toBe(subject.id)
    })
  })
})

describe('SubjectStore error', function () {
  let error = { message: 'No subject found' }
  beforeEach(function () {
    jest
      .spyOn(apiClient, 'type')
      .mockImplementation(() => {
        return {
          get: () => Promise.reject(error)
        }
      })
    const rootStore = AppStore.create({})
    subjectStore = rootStore.subjects
  })

  it('should set the error state', async function () {
    await subjectStore.fetchSubject('1')
    expect(subjectStore.error).toBe(error.message)
    expect(subjectStore.asyncState).toBe(ASYNC_STATES.ERROR)
  })

  it('should select a subject', function () {
    const subject = Subject.create({ id: '10' })
    subjectStore.selectSubject(subject)
    expect(subjectStore.current.id).toBe(subject.id)
  })

  it('should select a default subject if none provided', function () {
    const defaultSubject = Subject.create()
    subjectStore.selectSubject(null)
    expect(subjectStore.current).toEqual(defaultSubject)
  })
})

describe('SubjectStore empty return when fetching subjects', function () {
  it('should resolve the call without error', async function () {
    jest
      .spyOn(apiClient, 'type')
      .mockImplementation(() => {
        return {
          get: () => Promise.resolve([])
        }
      })
    const rootStore = AppStore.create({})
    subjectStore = rootStore.subjects
    await subjectStore.fetchSubject('1')
    expect(subjectStore.current).toEqual(Subject.create())
    expect(subjectStore.asyncState).toEqual(ASYNC_STATES.READY)
  })
})
