import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import './styles.css';

interface props {
  value: '週' | '月'
  suffix: string
  suffixStyle?: any
  onValueChange?: () => void
}

export default function({
  value,
  suffix,
  suffixStyle
}: props) {
  const [spinValue, updateValue] = useState<'週' | '月'>(value);
  function increaseValue() {
    updateValue(prev => prev === '月' ? '週' : '月');
  }
  function decreaseValue() {
    updateValue(prev => prev === '月' ? '週' : '月');
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