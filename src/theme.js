const theme = {
  global: {
    colors: {
      medGray: '#5C5C5C',
      gray: '#979797',
      sand: '#EFF2F5'
    },
    font: {
      family: "'Karla', Arial, sans-serif",
      face: `
        @font-face {
          font-family: 'Karla';
          font-style: normal;
          font-weight: 400;
          src:
            local('Karla'),
            local('Karla-Regular'),
            url(https://fonts.gstatic.com/s/karla/v6/qkBbXvYC6trAT7RVLtyU5rZP.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
        @font-face {
          font-family: 'Karla';
          font-style: normal;
          font-weight: 700;
          src:
            local('Karla Bold'),
            local('Karla-Bold'),
            url(https://fonts.gstatic.com/s/karla/v6/qkBWXvYC6trAT7zuC8m5xLtlmgzD.woff2) format('woff2');
          unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
      `
    }
  },
  table: {
    extend: props => `
      tr:nth-child(even) {
        background: #EEEEEE;
      }
      thead {
        text-transform: uppercase;
      }
      span {
        font-size: 0.8em;
      }
      label div {
        border-radius: 0;
        border-color: 1px solid #979797;
        height: 1em;
        width: 1em;
      }
    `
  }
}

module.exports = theme;
