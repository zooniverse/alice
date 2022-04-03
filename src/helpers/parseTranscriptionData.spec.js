import { constructCoordinates, constructText, mapExtractsToReductions } from './parseTranscriptionData'

describe('Helpers > parseTranscriptionData', function () {
  const date = new Date()

  const line = {
    clusters_text: [
      ['Hello', 'Hello', ''],
      ['World', 'Worlde', 'Wurld']
    ],
    clusters_x: [0, 100],
    clusters_y: [100, 200]
  }
  export const mockExtract = {
    frame0: {
      slope: [0],
      text: [['My text for this line']],
      points: {
        x: [[200, 200]],
        y: [[300, 300]]
      }
    },
    time: date
  }
  const extractsByUser = {
    1: [mockExtract]
  }
  export const mockReduction = {
    gold_standard: [false],
    line_slope: 0,
    extract_index: [0],
    user_ids: [1]
  }
  const reductionText = [['My text for this line']]

  describe('Helper > constructCoordinates', function () {
    it('return an empty array if provided empty argument', function () {
      const value = constructCoordinates()
      expect(value.length).toBe(0)
    })

    it('should parse coordinates', function () {
      const value = constructCoordinates(line)
      const expectation = [
        { x1: line.clusters_x[0],
          x2: line.clusters_x[1],
          y1: line.clusters_y[0],
          y2: line.clusters_y[1]
        }
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

  describe('Helper > mapExtractsToReductions', function () {
    it('returns data needed for a line', function () {
      const result = mapExtractsToReductions(extractsByUser, mockReduction, 0, reductionText, 0)
      const time = new Date(0)
      time.setUTCSeconds(date)
      const expectation = {
        goldStandard: false,
        slope: 0,
        text: 'My text for this line',
        x1: 200,
        x2: 200,
        y1: 300,
        y2: 300,
        time }
      expect(result).toEqual([expectation])
    })

    it('should run with incomplete data', function () {
      const result = mapExtractsToReductions()
      expect(result).toEqual([])
    })
  })
})
