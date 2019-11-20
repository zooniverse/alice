import React from 'react'
import { Rnd } from 'react-rnd'
import { Box } from 'grommet'
import { AggregationSettingsContainer } from './AggregationSettingsContainer'

const AggregationModal = React.forwardRef(function (props, ref) {
  const dragHandle = "dragHandle"
  const rndEl = React.useRef(null)
  const modalEl = React.useRef(null)

  React.useEffect(() => {
    const containerSize = ref.current && ref.current.getBoundingClientRect()
    const modalSize = modalEl.current && modalEl.current.getBoundingClientRect()
    const RIGHT_BUFFER = 8
    const TOP_BUFFER = 20
    const xPos = containerSize.width - modalSize.width - RIGHT_BUFFER
    rndEl.current.updatePosition({ x: xPos, y: TOP_BUFFER + containerSize.top })
  }, [ref])

  return (
    <Rnd
      dragHandleClassName={dragHandle}
      enableResizing={false}
      ref={rndEl}
    >
      <Box ref={modalEl}>
        <AggregationSettingsContainer dragHandle={dragHandle} />
      </Box>
    </Rnd>
  )
})

export default AggregationModal
