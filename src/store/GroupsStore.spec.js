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
    const group = {
      display_name: 'A Group',
      id: 1
    }
    editorStore.selectGroup(group)
    expect(editorStore.current).toEqual(group)
  })

  it('should set a default group if none provided', function () {
    const emptyGroup = {
      display_name: '',
      id: 0
    }
    editorStore.selectGroup(null)
    expect(editorStore.current).toEqual(emptyGroup)
  })

  it('should set groups', function () {
    const input = {
      GROUP_1: 1,
      GROUP_2: 2
    }
    const outcome = [
      { display_name: 'GROUP_1', id: 1 },
      { display_name: 'GROUP_2', id: 2 }
    ]
    editorStore.setGroups(input)
    expect(editorStore.all).toEqual(outcome)
  })
})
