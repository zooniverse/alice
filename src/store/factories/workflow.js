import { Factory } from 'rosie'

export default new Factory()
  .attr('id', '1')
  .attr('type', 'workflow')
  .attr('attributes', {
    display_name: 'Workflow 1',
    groups: {}
  })
  .attr('relationships', {
    project: {
      data: {
        id: '1',
        type: 'project'
      }
    }
  })
