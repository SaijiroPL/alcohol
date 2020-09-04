import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

import './styles.css';

interface props {
  value: number
  type?: 'direct' | 'indirect'
  min?: number
  max?: number
  suffix: string
  suffixStyle?: any
  step?: number
  onValueChange?: (value: number) => void
}

export default function({
  value,
  type = 'direct',
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

  const [val, setVal] = React.useState(value)

  React.useEffect(() => {
    setVal(value)
  }, [value])

  return (
    <div className='dropdown-container'>
      <Select value={val} autoWidth onChange={(event) => {
        const v = event.target.value as number
        if (onValueChange) onValueChange(v)
        setVal(v)
      }}>
        {items}
      </Select>
      <span className='dropdown-suffix'>{suffix}</span>
    </div>
  )
}
