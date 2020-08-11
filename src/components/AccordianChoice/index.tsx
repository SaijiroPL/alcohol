import React, { useState } from 'react';

import AccordianItem from 'components/AccordianChoice/item'
import './styles.css';

interface props {
  info: {
    title: string
    description: string
  }[]
  selected: number[]
  updateItem: (index: number) => void
}

export default function({
  info,
  selected,
  updateItem
}: props) {
  // const [selected, updateSelected] = useState<number[]>([])

  function onItemClick(index: number) {
    updateItem(index)
    // if (!selected.includes(index))
    //   updateSelected(prev => [...prev, index])
    // else 
    //   updateSelected(prev => [...(prev.filter(value => value !== index))])
  }

  return (
    <div className='ac-accordian-wrapper'>
      <div className='ac-accordian-wrapper-title'>
        <span className='ac-accordian-title-span'>複数選択可</span>
      </div>
      {info.map((item, index) => (
        <AccordianItem 
          key={index} 
          content={item} 
          index={index} 
          selected={selected.includes(index)} 
          onItemClick={onItemClick} />
      ))}
    </div>
  )
}