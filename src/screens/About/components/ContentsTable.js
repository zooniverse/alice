import React from 'react'
import { Anchor, Box, Text } from 'grommet'
import styled from 'styled-components'
import contents from '../contents'

const CapitalText = styled(Text)`
  text-transform: uppercase;
`

const PlainAnchor = styled(Anchor)`
  text-decoration: none;
`

const StyledList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const BUFFER = 12

function renderHeaders(title, key) {
  return (
    <li>
      <PlainAnchor key={`ABOUT_NAV_${key}`} href={`#${title}`}>
        <CapitalText color='#005D69' weight={300}>{title}</CapitalText>
      </PlainAnchor>
    </li>
  )
}

const ContentsTable = React.forwardRef(function (props, ref) {
  const [contentsHeight, setContentsHeight] = React.useState(0)

  React.useEffect(() => {
    function setHeight() {
      const { current } = ref
      if (current) {
        const rect = current.getBoundingClientRect()
        const contentHeight = window.innerHeight - rect.height - BUFFER
        setContentsHeight(contentHeight)
      }
    }
    setHeight()

    window.addEventListener('resize', setHeight)
    return () => window.removeEventListener('resize', setHeight)
  }, [ref])

  return (
    <Box height={`${contentsHeight}px`} pad={{ bottom: 'xsmall' }} overflow='auto'>
      <StyledList>
        {contents.map((content, i) =>
          <>
            {renderHeaders(content.title, i)}
            {content.sub && content.sub.map((secondHead, i) =>
              <StyledList>
                {renderHeaders(secondHead.title, i)}
                {secondHead.sub && secondHead.sub.map((thirdHead, i) =>
                  <StyledList>
                    {renderHeaders(thirdHead.title, i)}
                  </StyledList>
                )}
              </StyledList>
            )}
          </>
        )}
      </StyledList>
    </Box>
  )
})

export default ContentsTable
