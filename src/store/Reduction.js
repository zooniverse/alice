import { types } from 'mobx-state-tree'

const Reduction = types.model('Reduction', {
  clusters_x: types.array(types.number),
  clusters_y: types.array(types.number),
  clusters_text: types.array(types.array(types.string)),
  consensus_text: types.optional(types.string, ''),
  consensus_score: types.optional(types.number, 0),
  edited_consensus_text: types.optional(types.string, ''),
  extract_index: types.array(types.integer),
  flagged: types.optional(types.boolean, false),
  gold_standard: types.array(types.boolean),
  gutter_label: types.optional(types.integer, 0),
  line_slope: types.optional(types.number, 0),
  low_consensus: types.optional(types.boolean, false),
  number_views: types.optional(types.integer, 0),
  seen: types.optional(types.boolean, false),
  slope_label: types.optional(types.integer, 0),
  user_ids: types.array(types.integer)
})
.actions(self => ({
  setConsensusText: (text, isOriginalOption = false) => {
    self.edited_consensus_text = isOriginalOption ? '' : text
  },

  toggleCurrentFlag: function() {
    self.flagged = !self.flagged
  },

  toggleCurrentSeen: function() {
    self.seen = !self.seen
  }
}))

export default Reduction
