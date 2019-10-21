import React from 'react'
import MarkApproved from './MarkApproved'
import { observer } from 'mobx-react'
import AppContext from 'store'

function MarkApprovedContainer() {
  const store = React.useContext(AppContext)
  const disabled = store.aggregations.showSettings
  const [isChecked, setChecked] = React.useState(false)

  return (
    <MarkApproved
      checked={isChecked}
      disabled={disabled}
      onChange={() => { setChecked(!isChecked) }}
    />
  )
}

export default observer(MarkApprovedContainer)
