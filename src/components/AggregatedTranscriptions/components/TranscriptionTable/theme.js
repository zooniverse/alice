const theme = {
  table: {
    header: {
      border: {
        color: 'transparent'
      }
    },
    extend: props => `
      tr:nth-child(even) {
        background: white;
      }
      tbody tr {
        border-bottom: 1px solid #ECECEC;
      }
      tbody td div {
        padding: 0em;
      }
    `
  }
}

export default theme
