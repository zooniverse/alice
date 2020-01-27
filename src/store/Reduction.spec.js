import Reduction from './Reduction'
import * as mobX from 'mobx-state-tree'

let reduction
const checkForFlagUpdateSpy = jest.fn()
const saveTranscriptionsSpy = jest.fn()

const consensusText = 'Consensus Text'
const contextValues = {
  auth: {
    user: { display_name: 'User' }
  },
  transcriptions: {
    checkForFlagUpdate: checkForFlagUpdateSpy,
    saveTranscription: saveTranscriptionsSpy
  }
}

describe('Reduction', function () {
  beforeEach(function () {
    jest
      .spyOn(mobX, 'getRoot')
      .mockImplementation((context) => contextValues)
    reduction = Reduction.create({
      consensus_text: consensusText
    })
  })

  afterEach(() => jest.clearAllMocks());

  it('should exist', function () {
    expect(reduction).toBeDefined()
  })

  describe('function setConsensusText', function () {
    it('should set consensus_text', function () {
      const text = 'Some Text'
      reduction.setConsensusText(text)
      expect(reduction.line_editor).toBe('User')
      expect(reduction.edited_consensus_text).toBe(text)
    })

    it('should revert consensus_text', function () {
      reduction.setConsensusText('Test this Out', true)
      expect(reduction.line_editor).toBe('')
      expect(reduction.edited_consensus_text).toBe('')
      expect(reduction.consensus_text).toBe(consensusText)
    })
  })

  it('should toggle the current flag', function () {
    reduction.toggleCurrentFlag()
    expect(checkForFlagUpdateSpy).toHaveBeenCalled()
    expect(reduction.flagged).toBe(true)
  })

  it('should toggle the current seen', function () {
    reduction.toggleCurrentSeen()
    expect(saveTranscriptionsSpy).toHaveBeenCalled()
    expect(reduction.seen).toBe(true)
  })
})
