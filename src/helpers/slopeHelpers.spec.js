import {
  BORDER_MAP,
  getPage,
  getSlopeLabel,
  isolateGroups,
  spotInGroup
} from './slopeHelpers'

describe('Helper > getPage', function () {
  it('should default to 0', function () {
    expect(getPage('frame0')).toBe(0)
  })

  it('should return the page number', function () {
    expect(getPage('frame1.0')).toBe(1)
  })
})

describe('Helper > getSlopeLabel', function () {
  it('should default to 0', function () {
    expect(getSlopeLabel()).toBe(0)
    expect(getSlopeLabel('')).toBe(0)
  })

  it('should return the page number', function () {
    expect(getSlopeLabel('frame1.1')).toBe(1)
  })
})

describe('Helper > isolateGroups', function () {
  it('should not isolate groups when non existent', function () {
    const keys = ['frame0.0', 'frame1.0', 'frame2.0', 'frame3.0']
    const groups = [['frame0.0'], ['frame1.0'], ['frame2.0'], ['frame3.0']]
    expect(isolateGroups(keys)).toEqual(groups)
  })

  it('should isolate intermittent groups', function () {
    const keys = ['frame0.0', 'frame1.0', 'frame1.1', 'frame2.0', 'frame3.0', 'frame3.1', 'frame4.0']
    const groups = [['frame0.0'], ['frame1.0', 'frame1.1'], ['frame2.0'], ['frame3.0', 'frame3.1'], ['frame4.0']]
    expect(isolateGroups(keys)).toEqual(groups)
  })

  it('should isolate consecutive groups', function () {
    const keys = ['frame0.0', 'frame1.0', 'frame1.1', 'frame2.0', 'frame2.1', 'frame3.0']
    const groups = [['frame0.0'], ['frame1.0', 'frame1.1'], ['frame2.0', 'frame2.1'], ['frame3.0']]
    expect(isolateGroups(keys)).toEqual(groups)
  })

  it('should isolate groups at the end', function () {
    const keys = ['frame0.0', 'frame1.0', 'frame1.1']
    const groups = [['frame0.0'], ['frame1.0', 'frame1.1']]
    expect(isolateGroups(keys)).toEqual(groups)
  })

  it('should isolate groups at the beginning', function () {
    const keys = ['frame0.0', 'frame0.1', 'frame1.0', 'frame2.0']
    const groups = [['frame0.0', 'frame0.1'], ['frame1.0'], ['frame2.0']]
    expect(isolateGroups(keys)).toEqual(groups)
  })
})

describe('Helper > spotInGroup', function () {
  const slopes = ['frame0.0', 'frame1.0', 'frame1.1', 'frame1.2']

  it('should apply a border at the beginning of a group', function () {
    expect(spotInGroup(slopes, 0)).toBe(BORDER_MAP.NONE)
  })

  it('should apply a border at the middle of a group', function () {
    expect(spotInGroup(slopes, 1)).toBe(BORDER_MAP.LEFT)
  })

  it('should apply a border at the end of a group', function () {
    expect(spotInGroup(slopes, 2)).toBe(BORDER_MAP.MIDDLE)
  })

  it('should not apply a border if not in a group', function () {
    expect(spotInGroup(slopes, 3)).toBe(BORDER_MAP.RIGHT)
  })
})
