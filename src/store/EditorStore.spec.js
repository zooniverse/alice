import { EditorStore } from './EditorStore'

describe('EditorStore', function () {
  let editorStore

  beforeEach(function () {
    editorStore = EditorStore.create()
  })

  it('should exist', function () {
    expect(editorStore).toBeDefined()
  })

  it('should toggle layout', function () {
    editorStore.toggleLayout()
    expect(editorStore.layout).toBe('column')
    editorStore.toggleLayout()
    expect(editorStore.layout).toBe('row')
  })

  it('should toggle line visibility', function () {
    editorStore.toggleLineVisibility()
    expect(editorStore.linesVisible).toBe(false)
  })
})
