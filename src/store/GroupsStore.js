import { types } from 'mobx-state-tree'

const Group = types.model('Group', {
  display_name: types.optional(types.string, ''),
  id: types.identifier
})

const GroupsStore = types.model('GroupsStore', {
  all: types.map(Group),
  current: types.safeReference(Group),
}).actions(self => ({
  selectGroup: function(group) {
    self.current = (group && group.id) || undefined
  },

  setGroups: function(groups) {
    Object.keys(groups).forEach((key) => {
      self.all.put(Group.create({
        display_name: key,
        id: groups[key].toString()
      }))
    })
  }
})).views(self => ({
  get title () {
    return (self.current && self.current.display_name) || ''
  }
}))

export { GroupsStore }
