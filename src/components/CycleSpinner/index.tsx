import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

import './styles.css';

interface props {
  value: '週' | '月'
  suffix: string
  suffixStyle?: any
  onValueChange?: (value: '週' | '月') => void
}

export default function({
  value,
  suffix,
  suffixStyle,
  onValueChange
}: props) {

  const [val, setVal] = React.useState(value)

  React.useEffect(() => {
    setVal(value)
  }, [value])

  return (
    <div className='ac-cycle-wrapper'>
      <Select value={val} autoWidth onChange={(event) => {
        const v = event.target.value as '週' | '月'
        if (onValueChange) onValueChange(v)
        setVal(v)
      }}>
        <MenuItem key='月' value='月'>月</MenuItem>
        <MenuItem key='週' value='週'>週</MenuItem>
      </Select>
      <span style={suffixStyle}>{suffix}</span>
    </div>
  )
}