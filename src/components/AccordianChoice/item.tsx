import React, { useState, useEffect } from 'react';

import { Button } from '@material-ui/core';

import arrowDown from 'svgs/arrow-down.svg';
import arrowUp from 'svgs/arrow-up.svg';

import './styles.css';

interface props {
  content: {
    title: string
    description: string
  }
  index: number
  selected: boolean
  onItemClick: (index: number) => void
}

export default function({
  content,
  index,
  selected,
  onItemClick
}: props) {
  const [descShow, updateDescShow] = useState<boolean>(false)
  function onItemShow() {
    updateDescShow(prev => !prev)
  }
  return (
    <div className='ac-accordian-row'>
      <div className='ac-accordian-header'>
        <Button 
          style={{
            backgroundColor: selected ? '#9BCFD1' : 'white',
            color: selected ?'white' : '#707070',
            borderRadius: '15px',
            fontSize: '22px',
            paddingLeft: '15px',
            paddingRight: '15px'
          }}
          onClick={() => onItemClick(index)}>
            {content.title}
        </Button>
        <Button
          style={{
            backgroundColor: '#376B6D',
            borderRadius: '15px',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
            float: 'right',
            width: '65px'
          }}
          onClick={() => onItemShow()}>
          説明
          <img src={descShow ? arrowUp : arrowDown} alt='describe' className='ac-accordian-arrow'/>
        </Button>
      </div>
      <div className='ac-accordian-description' style={{ display: descShow ? 'block' : 'none' }}>
        <span>{content.description}</span>
      </div>
    </div>
  )
}