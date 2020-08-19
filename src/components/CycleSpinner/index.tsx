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
  return (
    <div className='ac-cycle-wrapper'>
      <Select defaultValue={value} autoWidth onChange={(event) => {
        if (onValueChange) onValueChange(event.target.value as '週' | '月')
      }}>
        <MenuItem key='月' value='月'>月</MenuItem>
        <MenuItem key='週' value='週'>週</MenuItem>
      </Select>
      <span style={suffixStyle}>{suffix}</span>
    </div>
  )
}