import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import './styles.css';

interface props {
  value: number
}

export default function({
  value
}: props) {
  return (
    <div className='ac-spinner-container'>
      <span className='ac-spinner-number'>20</span>
      <div className='ac-spinner-arrow-container'>
        <IconButton className='ac-spinner-arrow' size='small'>
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton className='ac-spinner-arrow' size='small'>
          <ArrowDropDownIcon />
        </IconButton>
      </div>
    </div>
  )
}