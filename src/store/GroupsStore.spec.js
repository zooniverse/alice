import { GroupsStore } from './GroupsStore'

let editorStore

describe('GroupsStore', function () {
  beforeEach(function () {
    editorStore = GroupsStore.create()
  })

  it('should exist', function () {
    expect(editorStore).toBeDefined()
  })

  it('should select a group', function () {
    const group = { display_name: 'A_GROUP', subjects: 1 }
    editorStore.setGroups({ A_GROUP: 1 })
    editorStore.selectGroup(group.display_name)
    expect(editorStore.current).toEqual(group)
  })

  it('should set to undefined if no group provided', function () {
    editorStore.selectGroup(null)
    expect(editorStore.current).toEqual(undefined)
  })

  it('should set groups', function () {
    const input = {
      GROUP_1: 1,
      GROUP_2: 2
    }
    const outcome = [
      { display_name: 'GROUP_1', subjects: 1 },
      { display_name: 'GROUP_2', subjects: 2 }
    ]
    editorStore.setGroups(input)
    expect(Array.from(editorStore.all.values())).toEqual(outcome)
  })
})
