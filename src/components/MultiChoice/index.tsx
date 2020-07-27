import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import './styles.css';

interface props {
  options: string[]
  elementStyle?: any
}

export default function({
  options,
  elementStyle
}: props) {
  const [selected, updateSelected] = useState<undefined | number>(undefined)
  function onItemClick(index: number) {
    updateSelected(index)
  }
  return (
    <div className='ac-multichoice-container'>
      {options.map((option, index) => (
        <Button 
          style={{
            ...elementStyle, 
            backgroundColor: index !== selected ? 'white' : '#9BCFD1',
            color: index !== selected ? '#AAAAAA' : 'white',
            borderRadius: 15
          }} 
          className='ac-select-button' 
          onClick={() => onItemClick(index)}
          key={index}>
          {option}
        </Button>
      ))}
    </div>
  )
}