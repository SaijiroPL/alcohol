import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import './styles.css';

interface props {
  value: number
  suffix: string
  onValueChange?: () => void
}

export default function({
  value,
  suffix
}: props) {
  const [spinValue, updateValue] = useState(value);
  function increaseValue() {
    updateValue(prev => prev + 1);
  }
  function decreaseValue() {
    updateValue(prev => prev - 1);
  }
  return (
    <div style={{alignItems: 'center', display: 'flex', margin: 'auto', justifyContent: 'center'}}>
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
      <span>{suffix}</span>
    </div>
  )
}