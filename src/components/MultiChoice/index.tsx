import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import * as Colors from 'const/colors'
import './styles.css';

interface props {
  answer?: number
  columns: number
  elementStyle?: any
  options: string[]
  setAnswer?: (index: number) => void
}

export default function({
  answer,
  columns,
  options,
  elementStyle,
  setAnswer
}: props) {
  const [selected, updateSelected] = useState<undefined | number>(answer)
  function onItemClick(index: number) {
    updateSelected(index)
    if (setAnswer) setAnswer(index)
  }
  return columns === 1 ? (
    <div className='ac-multichoice-container'>
      {options.map((option, index) => (
        <Button 
          style={{
            ...elementStyle, 
            backgroundColor: index !== selected ? Colors.WHITE : Colors.PALEGREEN,
            color: index !== selected ? '#707070' : 'white',
            borderRadius: 15,
            fontWeight: index !== selected ? 'normal' : 'bold'
          }} 
          className='ac-select-button' 
          onClick={() => onItemClick(index)}
          key={index}>
          {option}
        </Button>
      ))}
    </div>
  ) : (
    <div style={{ display: 'flex' }}>
    <div className='ac-multichoice-container ac-multichoice-column'>
      {options.map((option, index) => (
        (index < Math.ceil(options.length / 2) &&
        <Button 
          style={{
            ...elementStyle, 
            backgroundColor: index !== selected ? Colors.WHITE : Colors.PALEGREEN,
            color: index !== selected ? '#707070' : 'white',
            fontWeight: index !== selected ? 'normal' : 'bold',
            borderRadius: 15
          }} 
          className='ac-select-button' 
          onClick={() => onItemClick(index)}
          key={index}>
          {option}
        </Button>)
      ))}
    </div>
    <div className='ac-multichoice-container ac-multichoice-column' style={{height: '30%'}}>
      {options.map((option, index) => (
        (index >= Math.ceil(options.length / 2) &&
        <Button 
          style={{
            ...elementStyle, 
            backgroundColor: index !== selected ? Colors.WHITE : Colors.PALEGREEN,
            color: index !== selected ? '#707070' : 'white',
            fontWeight: index !== selected ? 'normal' : 'bold',
            borderRadius: 15
          }} 
          className='ac-select-button' 
          onClick={() => onItemClick(index)}
          key={index}>
          {option}
        </Button>)
      ))}
    </div>
    </div>
  )
}