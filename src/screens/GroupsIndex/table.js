const mockData = [
  {
    group: "Group Name",
    subjects: 6859,
    lastEdit: "May 17, 2019",
    lastEditor: "Erin Green",
    link: "/123/subjects"
  },
  {
    group: "Group 2",
    subjects: 2928,
    lastEdit: "Jun 11, 2019",
    lastEditor: "Erin Green",
    link: "/123/subjects"
  },
  {
    group: "Group 3",
    subjects: 29,
    lastEdit: "Jun 12, 2019",
    lastEditor: "Erin Green",
    link: "/123/subjects"
  },
  {
    group: "Group 4",
    subjects: '0583',
    lastEdit: "April 15, 2019",
    lastEditor: "Charles Davies",
    link: "/123/subjects"
  },
  {
    group: "Group 5",
    subjects: 123,
    lastEdit: "Aug 31, 2019",
    lastEditor: "Laura Sofía Ureña",
    link: "/123/subjects"
  },
  {
    group: "Group 6",
    subjects: 1234,
    lastEdit: "May 17, 2019",
    lastEditor: "Monica Böttger",
    link: "/123/subjects"
  },
  {
    group: "Group 7",
    subjects: 12345,
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
    property: "subjects",
    header: "Subjects"
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
