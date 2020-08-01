import React, { useState } from 'react';
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
  onValueChange?: () => void
}

export default function({
  value,
  min = 0,
  max = 100,
  step = 1,
  suffix,
  suffixStyle
}: props) {
  const [spinValue, updateValue] = useState(value);
  function increaseValue() {
    updateValue(prev => Math.min(prev + step, max));
  }
  function decreaseValue() {
    updateValue(prev => Math.max(prev - step, min));
  }
  return (
    <div className='ac-spinner-wrapper'>
      <div className='ac-spinner-container'>
        <span className='ac-spinner-number'>{spinValue}</span>
        <div className='ac-spinner-arrow-container'>
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
      </div>
      <span style={suffixStyle}>{suffix}</span>
    </div>
  )
}