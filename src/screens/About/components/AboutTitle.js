import React from 'react'
import { Heading } from 'grommet'
import { number, string } from 'prop-types'

export default function AboutTitle({ distinction, level, title }) {
  return (
    <Heading id={`${title}${distinction}`} level={level}>
      {title}
    </Heading>
  )
}

AboutTitle.propTypes = {
  distinction: string,
  level: number,
  title: string.isRequired
}

AboutTitle.defaultProps = {
  distinction: '',
  level: 2
}
