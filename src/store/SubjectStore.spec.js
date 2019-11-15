import { subjects } from '@zooniverse/panoptes-js'
import ASYNC_STATES from 'helpers/asyncStates'
import { AppStore } from './AppStore'
import { Subject } from './SubjectStore'

let subjectStore

const mockSubject = {
  id: '1',
  locations: [],
  metadata: {}
}
const response = {
  body: {
    subjects: [mockSubject]
  }
}
const emptyResponse = {
  body: {
    subjects: []
  }
}

describe('SubjectStore', function () {
  beforeEach(function () {
    jest
      .spyOn(subjects, 'get')
      .mockImplementation(() => Promise.resolve(response))
    const rootStore = AppStore.create({})
    subjectStore = rootStore.subject
  })

  it('should exist', function () {
    expect(subjectStore).toBeDefined()
  })

  it('should change the index', function () {
    subjectStore.changeIndex(1)
    expect(subjectStore.index).toBe(1)
  })

  it('should set the subject', async function () {
    await subjectStore.fetchSubject('1')
    expect(subjectStore.current).toEqual(mockSubject)
    expect(subjectStore.error).toBe('')
    expect(subjectStore.asyncState).toBe(ASYNC_STATES.READY)
  })
})

describe('SubjectStore error', function () {
  let error = { message: 'No subject found' }
  beforeEach(function () {
    jest
      .spyOn(subjects, 'get')
      .mockImplementation(() => Promise.reject(error))
    const rootStore = AppStore.create({})
    subjectStore = rootStore.subject
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
      .spyOn(subjects, 'get')
      .mockImplementation(() => Promise.resolve(emptyResponse))
    const rootStore = AppStore.create({})
    subjectStore = rootStore.subject
    await subjectStore.fetchSubject('1')
    expect(subjectStore.current).toEqual(Subject.create())
    expect(subjectStore.asyncState).toEqual(ASYNC_STATES.READY)
  })
})
