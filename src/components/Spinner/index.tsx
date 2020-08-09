import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
  suffixStyle,
  onValueChange
}: props) {
  const [spinValue, updateValue] = useState(value);

  useEffect(() => {
    if (onValueChange) onValueChange(spinValue)
  }, [spinValue])

  function increaseValue() {
    updateValue(prev => Math.min(prev + step, max));
  }
  function decreaseValue() {
    updateValue(prev => Math.max(prev - step, min));
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div 
        className='ac-spinner-number'
        style={{
          fontSize: '36px',
          minWidth: '70px',
          textAlign: 'center'
        }}>
          {step < 1 ? spinValue.toFixed(1) : spinValue}
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <IconButton 
          className='ac-spinner-arrow'
          size='small' 
          onClick={increaseValue}>
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton 
          className='ac-spinner-arrow'
          size='small'
          onClick={decreaseValue}>
          <ArrowDropDownIcon />
        </IconButton>
      </div>
      <div style={{
        ...suffixStyle,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: '6px'
      }}>{suffix}</div>
    </div>
  )
}