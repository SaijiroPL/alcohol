import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

import './styles.css';

interface props {
  value: number
  min?: number
  max?: number
  suffix: string
  suffixStyle?: any
  step?: number
  onValueChange?: (value: number) => void
}

export default function({
  value,
  min = 0,
  max = 100,
  step = 1,
  suffix,
  onValueChange
}: props) {
  var items = [];
  for (var i = min; i <= max; i += step) {
    items.push(<MenuItem key={i} value={i}>{step < 1 ? i.toFixed(1) : i}</MenuItem>);
  }
  return (
    <div className='dropdown-container'>
      <Select defaultValue={value} autoWidth onChange={(event) => {
        if (onValueChange) onValueChange(event.target.value as number)
      }}>
        {items}
      </Select>
      <span className='dropdown-suffix'>{suffix}</span>
    </div>
  )
}
