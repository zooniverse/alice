import React from 'react'
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
    property: "sets",
    header: "Groups"
  },
  {
    property: "subjects",
    header: "Approved Subjects",
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
