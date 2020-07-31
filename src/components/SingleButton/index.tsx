import React from 'react';
import cn from 'classnames';

import './styles.css';
import { Button } from '@material-ui/core';

interface props {
  title: string,
  color: 'green' | 'red'
  nonSticky?: boolean
  onClick?: () => void
}

export default function({
  color,
  nonSticky,
  title,
  onClick
}: props) {
  return (
    <div className={cn({'ac-singlebtn-wrapper-fixed': !nonSticky}, {'ac-singlebtn-wrapper': nonSticky})}>
      <Button 
        className='ac-singlebtn' 
        style={{
          backgroundColor: color === 'green' ? '#376B6D' : '#993333', 
          color: 'white', 
          borderRadius: 20,
        }}
        onClick={() => {
          if (onClick) onClick()
        }}>
          {title}
      </Button>
    </div>

  )
}