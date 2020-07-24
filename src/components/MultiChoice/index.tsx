import React from 'react';
import Button from '@material-ui/core/Button';

import './styles.css';

export default function() {
  return (
    <div className='ac-multichoice-container'>
      <Button color='inherit' className='ac-select-button' style={{margin:'auto'}}>男性</Button>
      <Button color='inherit' className='ac-select-button' style={{margin:'auto'}}>女性</Button>
    </div>
  )
}