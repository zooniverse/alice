import { Text } from 'grommet'

const columns = [
  {
    property: "name",
    header: "Workflow Name",
    render: datum => <Text>{datum.display_name}</Text>
  },
  {
    property: "id",
    header: "Workflow id"
  },
  {
    property: "groups",
    header: "Groups",
    render: datum => <Text>{Object.keys(datum.groups).length}</Text>
  },
  {
    property: "total_transcriptions",
    header: "Total Subjects",
  },
  {
    property: "lastEdit",
    header: "Last Edit",
  },
  {
    property: "lastEditor",
    header: "Last Editor"
  }
];

export default columns;
