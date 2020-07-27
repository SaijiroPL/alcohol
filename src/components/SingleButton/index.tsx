import React from 'react';

import './styles.css';
import { Button } from '@material-ui/core';

interface props {
  onClick?: () => void
}

export default function({
  onClick
}: props) {
  return (
    <Button 
      className='ac-singlebtn' 
      style={{
        backgroundColor: '#376B6D', 
        color: 'white', 
        borderRadius: 20,
        position: 'absolute',
        bottom: 30,
        left: '50%',
        marginLeft: '-142px'
      }}
      onClick={() => {
        console.log(onClick)
        if (onClick) onClick()
      }}>
        次　へ
    </Button>
  )
}