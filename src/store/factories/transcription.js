import { Factory } from 'rosie'

export default new Factory()
  .attr('id', '1')
  .attr('type', "transcription")
  .attr('attributes', {
    subject_id: 1,
    workflow_id: 1,
    group_id: 'GROUP_1',
    text: [],
    status: 'unseen',
    flagged: false
  })
  .attr('relationships', {
    workflow: {
      data: {
        id: '1',
        type: 'workflow'
      }
    }
  })
