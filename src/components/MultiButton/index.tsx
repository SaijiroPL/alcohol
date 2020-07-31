import React from 'react';
import cn from 'classnames';

import './styles.css';
import { Button } from '@material-ui/core';

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
          backgroundColor: color === 'green' ? '#376B6D' : '#993333', 
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
          backgroundColor: color === 'green' ? '#376B6D' : '#993333', 
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