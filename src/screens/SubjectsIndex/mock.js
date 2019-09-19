const mockData = [
  {
    id: 458050,
    extId: 'Lorem ipsum',
    lastEdit: 'May 17, 2019',
    lastEditor: 'Erin Green',
    status: 'APPROVED',
    flag: false,
    consensusScore: 5.5,
    classifications: 6,
    lines: 100,
    pages: 5,
    locked: false
  },
  {
    id: 458049,
    extId: 'Dolor sit amet',
    lastEdit: 'Jun 11, 2019',
    lastEditor: 'Erin Green',
    status: 'IN PROGRESS',
    flag: false,
    consensusScore: 1,
    classifications: 2,
    lines: 78,
    pages: 1,
    locked: false
  },
  {
    id: 458048,
    extId: 'Certa inquam',
    lastEdit: 'Jun 12, 2019',
    lastEditor: 'Erin Green',
    status: 'UNREVIEWED',
    flag: false,
    consensusScore: 6.6,
    classifications: 8,
    lines: 41,
    pages: 5,
    locked: false
  },
  {
    id: 458047,
    extId: 'pertinax non',
    lastEdit: 'April 15, 2019',
    lastEditor: 'Charles Davies',
    status: 'READY',
    flag: true,
    consensusScore: 3,
    classifications: 3,
    lines: 95,
    pages: 6,
    locked: false
  },
  {
    id: 458046,
    extId: 'recusandae itaque',
    lastEdit: 'Aug 31, 2019',
    lastEditor: 'Laura Sofía Ureña',
    status: 'APPROVED',
    flag: true,
    consensusScore: 12.1,
    classifications: 13,
    lines: 35,
    pages: 4,
    locked: false
  },
  {
    id: 458045,
    extId: 'turbent ut aliquid',
    lastEdit: 'May 17, 2019',
    lastEditor: 'Monica Böttger',
    status: 'IN PROGRESS',
    flag: true,
    consensusScore: 5.5,
    classifications: 6,
    lines: 89,
    pages: 2,
    locked: true
  },
  {
    id: 458044,
    extId: 'ex ea commodi',
    lastEdit: 'Jun 11, 2019',
    lastEditor: 'Harmen Porter',
    status: 'APPROVED',
    flag: true,
    consensusScore: 1,
    classifications: 2,
    lines: 84,
    pages: 7,
    locked: false
  },
  {
    id: 458043,
    extId: 'consequatur quis',
    lastEdit: 'Jun 12, 2019',
    lastEditor: 'Erin Green',
    status: 'IN PROGRESS',
    flag: false,
    consensusScore: 6.6,
    classifications: 8,
    lines: 87,
    pages: 6,
    locked: false
  },
  {
    id: 458042,
    extId: 'nostrum',
    lastEdit: 'April 15, 2019',
    lastEditor: 'Ored Sjögren',
    status: 'UNREVIEWED',
    flag: false,
    consensusScore: 3,
    classifications: 3,
    lines: 96,
    pages: 1,
    locked: false
  },
  {
    id: 458041,
    extId: 'exercitationem',
    lastEdit: 'Aug 31, 2019',
    lastEditor: 'Sakane Milko',
    status: 'READY',
    flag: true,
    consensusScore: 12.1,
    classifications: 13,
    lines: 100,
    pages: 5,
    locked: false
  },
  {
    id: 458040,
    extId: 'ullam corporis',
    lastEdit: 'May 17, 2019',
    lastEditor: 'Erin Green',
    status: 'APPROVED',
    flag: true,
    consensusScore: 5.5,
    classifications: 6,
    lines: 78,
    pages: 1,
    locked: false
  },
  {
    id: 458039,
    extId: 'laboriosam nisi ut',
    lastEdit: 'Jun 12, 2019',
    lastEditor: 'Ohta Kin',
    status: 'APPROVED',
    flag: false,
    consensusScore: 6.6,
    classifications: 8,
    lines: 95,
    pages: 6,
    locked: true
  },
  {
    id: 458038,
    extId: 'laboriosam nisi ut',
    lastEdit: 'Jun 12, 2019',
    lastEditor: 'Ohta Kin',
    status: 'APPROVED',
    flag: false,
    consensusScore: 6.6,
    classifications: 8,
    lines: 95,
    pages: 6,
    locked: false
  },
  {
    id: 458037,
    extId: 'de quo ignorae',
    lastEdit: 'April 15, 2019',
    lastEditor: 'Erin Green',
    status: 'IN PROGRESS',
    flag: true,
    consensusScore: 3,
    classifications: 3,
    lines: 35,
    pages: 4,
    locked: false
  },
  {
    id: 458036,
    extId: 'vos arbitrer sed',
    lastEdit: 'Aug 31, 2019',
    lastEditor: 'Erin Green',
    status: 'UNREVIEWED',
    flag: false,
    consensusScore: 12.1,
    classifications: 13,
    lines: 89,
    pages: 2,
    locked: false
  },
  {
    id: 458035,
    extId: 'uti oratione',
    lastEdit: 'May 17, 2019',
    lastEditor: 'Charles Davies',
    status: 'READY',
    flag: true,
    consensusScore: 5.5,
    classifications: 6,
    lines: 84,
    pages: 7,
    locked: false
  },
  {
    id: 458034,
    extId: 'perpetua malo',
    lastEdit: 'Jun 11, 2019',
    lastEditor: 'Laura Sofía Ureña',
    status: 'APPROVED',
    flag: false,
    consensusScore: 1,
    classifications: 2,
    lines: 87,
    pages: 6,
    locked: false
  },
  {
    id: 458033,
    extId: 'quam interrogare',
    lastEdit: 'Jun 12, 2019',
    lastEditor: 'Monica Böttger',
    status: 'IN PROGRESS',
    flag: true,
    consensusScore: 6.6,
    classifications: 8,
    lines: 96,
    pages: 1,
    locked: false
  },
  {
    id: 458032,
    extId: 'aut quid est et',
    lastEdit: 'April 15, 2019',
    lastEditor: 'Harmen Porter',
    status: 'APPROVED',
    flag: true,
    consensusScore: 3,
    classifications: 3,
    lines: 35,
    pages: 5,
    locked: false
  },
  {
    id: 458031,
    extId: 'accurate',
    lastEdit: 'Aug 31, 2019',
    lastEditor: 'Erin Green',
    status: 'IN PROGRESS',
    flag: true,
    consensusScore: 12.1,
    classifications: 13,
    lines: 89,
    pages: 1,
    locked: false
  },
  {
    id: 458030,
    extId: 'Hanc ego',
    lastEdit: 'May 17, 2019',
    lastEditor: 'Ored Sjögren',
    status: 'UNREVIEWED',
    flag: false,
    consensusScore: 5.5,
    classifications: 6,
    lines: 84,
    pages: 5,
    locked: false
  }
];

const mockColumns = [
  {
    property: "id",
    header: "Zooniverse ID"
  },
  {
    property: "extId",
    header: "External ID"
  },
  {
    property: "lastEdit",
    header: "Last Edit"
  },
  {
    property: "lastEditor",
    header: "Last Editor"
  },
  {
    property: "status",
    header: "Status"
  },
  {
    property: "flag",
    header: "Flag"
  },
  {
    property: "consensusScore",
    header: "Consensus Score"
  },
  {
    property: "lines",
    header: "Transcribed Lines"
  },
  {
    property: "pages",
    header: "Pages"
  },
];

export { mockColumns, mockData }
