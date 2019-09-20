const theme = {
  table: {
    header: {
      border: {
        color: 'transparent'
      }
    },
    extend: props => `
      tbody tr {
        border-bottom: 1px solid #ECECEC;
      }
      tbody td div {
        padding: 0em;
      }
      td > div:first-child {
        height: inherit;
      }
      td > div:first-child > div {
        margin-bottom: 0.75em;
        margin-top: auto;
      }
      td span {
        margin-bottom: 0.75em;
        margin-top: auto;
      }
    `
  }
}

export default theme
