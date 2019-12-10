import { constructCoordinates, constructText } from './parseTranscriptionData'

const line = {
  clusters_text: [
    ['Hello', 'Hello', ''],
    ['World', 'Worlde', 'Wurld']
  ],
  clusters_x: [0, 100],
  clusters_y: [100, 200]
}

describe('Helper > constructCoordinates', function () {
  it('return an empty array if provided empty argument', function () {
    const value = constructCoordinates()
    expect(value.length).toBe(0)
  })

  it('should parse coordinates', function () {
    const value = constructCoordinates(line)
    const expectation = [
      { x: line.clusters_x[0], y: line.clusters_y[0] },
      { x: line.clusters_x[1], y: line.clusters_y[1] }
    ]
    expect(value).toEqual(expectation)
  })
})

describe('Helper > constructText', function () {
  it('return an empty array if provided empty argument', function () {
    const value = constructText()
    expect(value.length).toBe(0)
  })

  it('should parse coordinates', function () {
    const value = constructText(line)
    const expectation = [ 'Hello World', 'Hello Worlde', 'Wurld' ]
    expect(value).toEqual(expectation)
  })
})
