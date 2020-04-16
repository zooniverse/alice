import { css } from 'styled-components'

const theme = {
  table: {
    extend: props => css`
      tr:nth-child(even) {
        background: #ffffff;
      }
    `
  }
}

export default theme
