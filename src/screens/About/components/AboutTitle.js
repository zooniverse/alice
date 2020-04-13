import React from 'react'
import { Heading } from 'grommet'
import { number, string } from 'prop-types'

export default function AboutTitle({ level, title }) {
  return (
    <Heading id={title} level={level}>
      {title}
    </Heading>
  )
}

AboutTitle.propTypes = {
  level: number,
  title: string.isRequired
}

AboutTitle.defaultProps = {
  level: 2
}
