import Reduction from './Reduction'
import * as mobX from 'mobx-state-tree'

let reduction
const consensusText = 'Consensus Text'
const contextValues = {
  auth: {
    user: { display_name: 'User' }
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
    expect(reduction.flagged).toBe(true)
  })

  it('should toggle the current seen', function () {
    reduction.toggleCurrentSeen()
    expect(reduction.seen).toBe(true)
  })
})
