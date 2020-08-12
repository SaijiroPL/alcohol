import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

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
  function increaseValue() {
    if(onValueChange) onValueChange(value === '月' ? '週' : '月');
  }
  function decreaseValue() {
    if(onValueChange) onValueChange(value === '月' ? '週' : '月');
  }
  return (
    <div className='ac-spinner-wrapper'>
      <div className='ac-spinner-container'>
        <span className='ac-spinner-number'>{value}</span>
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