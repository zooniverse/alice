import { GroupsStore } from './GroupsStore'

describe('GroupsStore', function () {
  let editorStore

  beforeEach(function () {
    editorStore = GroupsStore.create()
  })

  it('should exist', function () {
    expect(editorStore).toBeDefined()
  })

  it('should select a group', function () {
    const group = { display_name: 'A_GROUP', last_edit: '', last_editor: '', subjects: 1 }
    editorStore.setGroups({ A_GROUP: { transcription_count: 1 } })
    editorStore.selectGroup(group.display_name)
    expect(editorStore.current).toEqual(group)
  })

  it('should set a default group if none provided', function () {
    const emptyGroup = {
      display_name: '',
      last_edit: '',
      last_editor: '',
      subjects: 0
    }
    editorStore.selectGroup(null)
    expect(editorStore.current).toEqual(emptyGroup)
  })

  it('should set groups', function () {
    const input = {
      GROUP_1: { transcription_count: 1 },
      GROUP_2: { transcription_count: 2 }
    }
    const outcome = [
      [
        { display_name: 'GROUP_1', last_edit: '', last_editor: '', subjects: 1 },
        { display_name: 'GROUP_2', last_edit: '', last_editor: '', subjects: 2 }
      ]
    ]
    editorStore.setGroups(input)
    expect(editorStore.all).toEqual(outcome)
  })

  it('should set the page', function () {
    editorStore.setPage(2)
    expect(editorStore.page).toBe(2)
  })
})
