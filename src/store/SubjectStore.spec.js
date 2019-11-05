import { subjects } from '@zooniverse/panoptes-js'
import ASYNC_STATES from 'helpers/asyncStates'
import { SubjectStore } from './SubjectStore'

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

describe('SubjectStore', function () {
  beforeEach(function () {
    jest
      .spyOn(subjects, 'get')
      .mockImplementation(() => Promise.resolve(response))
    subjectStore = SubjectStore.create()
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
    subjectStore = SubjectStore.create()
  })

  it('should set the error state', async function () {
    await subjectStore.fetchSubject('1')
    expect(subjectStore.error).toBe(error.message)
    expect(subjectStore.asyncState).toBe(ASYNC_STATES.ERROR)
  })
})