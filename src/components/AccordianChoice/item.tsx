import React from 'react';

import { Button } from '@material-ui/core';

import * as Colors from 'const/colors'
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
  return (
    <div className='ac-accordian-row'>
      <div className='ac-accordian-header'>
        <Button 
          style={{
            backgroundColor: selected ? Colors.PALEGREEN : Colors.WHITE,
            color: selected ? Colors.WHITE : Colors.GRAY,
            boxShadow: selected ? '' : '2px 2px 3px #9BCFD1',
            borderRadius: '15px',
            fontSize: '22px',
            paddingLeft: '15px',
            paddingRight: '15px'
          }}
          onClick={() => onItemClick(index)}>
            {content.title}
        </Button>
      </div>
      <div className='ac-accordian-description'>
        <span>{content.description}</span>
      </div>
    </div>
  )
}