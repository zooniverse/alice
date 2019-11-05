import { types } from 'mobx-state-tree'

const Group = types.model('Group', {
  display_name: types.optional(types.string, ''),
  id: types.optional(types.number, 0)
})

const GroupsStore = types.model('GroupsStore', {
  all: types.array(Group),
  current: types.optional(Group, {}),
}).actions(self => ({
  selectGroup: function(group) {
    self.current = Group.create({
      display_name: group.display_name,
      id: group.id
    })
  },

  setGroups: function(groups) {
    self.all = Object.keys(groups).map((key) => {
      return Group.create({
        display_name: key,
        id: groups[key]
      })
    })
  }
}))

export { GroupsStore }
