import React from 'react';
import { Button } from '@material-ui/core';
import cn from 'classnames';

import * as Colors from 'const/colors'
import './styles.css';

interface props {
  color?: 'green' | 'red'
  nonSticky?: boolean
  okayText?: string
  cancelText?: string
  onNext?: () => void
  onBack?: () => void
}

export default function({
  color = 'green',
  nonSticky,
  okayText = '次　へ',
  cancelText = '戻　る',
  onNext,
  onBack
}: props) {
  return (
    <div className={cn({'ac-multibtn-wrapper-fixed': !nonSticky}, {'ac-multibtn-wrapper': nonSticky})}>
      <Button 
        className='ac-multibtn' 
        style={{
          backgroundColor: color === 'green' ? Colors.GREEN : Colors.RED, 
          color: 'white', 
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderRight: 'solid 1px white',
        }}
        onClick={() => {
          if (onBack) onBack()
        }}>
          {cancelText}
      </Button>
      <Button 
        className='ac-multibtn' 
        style={{
          backgroundColor: color === 'green' ? Colors.GREEN : Colors.RED, 
          color: 'white', 
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderLeft: 'solid 1px white',
        }}
        onClick={() => {
          if (onNext) onNext()
        }}>
          {okayText}
      </Button>
    </div>
  )
}