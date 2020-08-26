import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import { arrowUp, arrowDown } from 'const/icons'

import * as Colors from 'const/colors'
import './styles.css';

interface props {
  content: {
    title: string
    description: string
  }
  index: number
  selected: boolean
  expanded: boolean
  onItemClick: (index: number) => void
}

export default function({
  content,
  index,
  selected,
  expanded,
  onItemClick
}: props) {
  return (
    <div className='ac-accordian-row'>
      <div className='ac-accordian-header'>
        <Button 
          style={{
            backgroundColor: selected ? Colors.PALEGREEN : Colors.WHITE,
            color: selected ? Colors.WHITE : Colors.GRAY,
            borderRadius: '15px',
            fontSize: '22px',
            paddingLeft: '15px',
            paddingRight: '15px'
          }}
          onClick={() => onItemClick(index)}>
            {content.title}
        </Button>
      </div>
      <div className='ac-accordian-description' style={{ display: expanded ? 'block' : 'none' }}>
        <span>{content.description}</span>
      </div>
    </div>
  )
}