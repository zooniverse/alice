const mockData = [
  {
    group: "Group Name",
    groupId: 6859,
    lastEdit: "May 17, 2019",
    lastEditor: "Erin Green",
    link: "/123/subjects"
  },
  {
    group: "Group 2",
    groupId: 2928,
    lastEdit: "Jun 11, 2019",
    lastEditor: "Erin Green",
    link: "/123/subjects"
  },
  {
    group: "Group 3",
    groupId: 29,
    lastEdit: "Jun 12, 2019",
    lastEditor: "Erin Green",
    link: "/123/subjects"
  },
  {
    group: "Group 4",
    groupId: '0583',
    lastEdit: "April 15, 2019",
    lastEditor: "Charles Davies",
    link: "/123/subjects"
  },
  {
    group: "Group 5",
    groupId: 123,
    lastEdit: "Aug 31, 2019",
    lastEditor: "Laura Sofía Ureña",
    link: "/123/subjects"
  },
  {
    group: "Group 6",
    groupId: 1234,
    lastEdit: "May 17, 2019",
    lastEditor: "Monica Böttger",
    link: "/123/subjects"
  },
  {
    group: "Group 7",
    groupId: 12345,
    lastEdit: "Jun 11, 2019",
    lastEditor: "Harmen Porter",
    link: "/123/subjects"
  }
];

const columns = [
  {
    property: "display_name",
    header: "Group"
  },
  {
    property: "id",
    header: "Group ID"
  },
  {
    property: "lastEdit",
    header: "Last Edit"
  },
  {
    property: "lastEditor",
    header: "Last Editor"
  }
];

export { columns, mockData }
