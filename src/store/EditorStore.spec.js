import { EditorStore } from './EditorStore'

let editorStore

describe('EditorStore', function () {
  beforeEach(function () {
    editorStore = EditorStore.create()
  })

  it('should exist', function () {
    expect(editorStore).toBeDefined()
  })

  it('should toggle layout', function () {
    editorStore.toggleLayout()
    expect(editorStore.layout).toBe('column')
  })
})
