import { types } from 'mobx-state-tree'

const Group = types.model('Group', {
  display_name: types.optional(types.string, ''),
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

  selectGroup: function(group) {
    self.current = Group.create({
      display_name: (group && group.display_name) || '',
      subjects: (group && group.subjects) || 0
    })
  },

  setGroups: function(groups) {
    const unchunkedArray = Object.keys(groups).map((key) => {
      return Group.create({
        display_name: key,
        subjects: groups[key]
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
