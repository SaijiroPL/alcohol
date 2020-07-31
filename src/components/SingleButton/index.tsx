import React from 'react';
import cn from 'classnames';

import './styles.css';
import { Button } from '@material-ui/core';

interface props {
  title: string,
  color: string,
  nonSticky?: boolean
  textColor?: string
  onClick?: () => void
}

export default function({
  color,
  nonSticky,
  title,
  textColor = '#FFF',
  onClick
}: props) {
  return (
    <div className={cn({'ac-singlebtn-wrapper-fixed': !nonSticky}, {'ac-singlebtn-wrapper': nonSticky})}>
      <Button 
        className='ac-singlebtn' 
        style={{
          backgroundColor: color, 
          color: textColor, 
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