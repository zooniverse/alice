import { types } from 'mobx-state-tree'
import writeDate from 'helpers/writeDate'

const Group = types.model('Group', {
  display_name: types.optional(types.string, ''),
  last_edit: types.optional(types.string, ''),
  last_editor: types.optional(types.string, ''),
  subjects: types.optional(types.number, 0)
})

const GroupsStore = types.model('GroupsStore', {
  all: types.array(types.array(Group)),
  current: types.optional(Group, {}),
  page: types.optional(types.number, 0),
  totalPages: types.optional(types.number, 1)
}).actions(self => ({
  reset: () => {
    self.selectGroup(null)
  },

  selectGroup: function(name) {
    const mergedPages = [].concat(...self.all.slice())
    const selectedGroup = mergedPages.find(group => group.display_name === name)
    self.current = Group.create({
      display_name: (selectedGroup && selectedGroup.display_name) || '',
      subjects: (selectedGroup && selectedGroup.subjects) || 0
    })
  },

  setGroups: function(groups) {
    const unchunkedArray = Object.keys(groups).map((key) => {
      return Group.create({
        display_name: key,
        last_edit: writeDate(groups[key].updated_at),
        last_editor: groups[key].updated_by || '',
        subjects: groups[key].transcription_count
      })
    })

    const chunkedArray = []
    let totalPages = 0
    while(unchunkedArray.length) {
      chunkedArray.push(unchunkedArray.splice(0,30))
      totalPages++
    }
    self.totalPages = totalPages
    self.all = chunkedArray
  },

  setPage: function(page) {
    self.page = page
  }
})).views(self => ({
  get title () {
    return (self.current && self.current.display_name) || ''
  }
}))

export { Group, GroupsStore }
