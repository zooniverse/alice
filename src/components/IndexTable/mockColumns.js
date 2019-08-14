const columns = [
  {
    property: "name",
    header: "Workflow Name"
  },
  {
    property: "id",
    header: "Workflow id",
  },
  {
    property: "sets",
    header: "Subject Sets"
  },
  {
    property: "subjects",
    header: "Approved Subjects",
    render: datum => datum.subjects,
  },
  {
    property: "lastEdit",
    header: "Last Edit",
    render: datum => datum.lastEdit,
  },
  {
    property: "lastEditor",
    header: "Last Editor"
  }
];

export default columns;
