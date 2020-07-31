import React, { useState } from 'react';

import AccordianItem from 'components/AccordianChoice/item'
import './styles.css';

interface props {
  info: {
    title: string
    description: string
  }[]
}

export default function({
  info
}: props) {
  const [selected, updateSelected] = useState<undefined | number>(undefined)

  function onItemClick(index: number) {
    updateSelected(index)
  }

  return (
    <div className='ac-accordian-wrapper'>
      <div className='ac-accordian-wrapper-title'>
        <span className='ac-accordian-title-span'>複数選択可</span>
      </div>
      {info.map((item, index) => (
        <AccordianItem content={item} index={index} selected={selected === index} onItemClick={onItemClick} />
      ))}
    </div>
  )
}