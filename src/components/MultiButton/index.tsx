import React from 'react';
import cn from 'classnames';

import './styles.css';
import { Button } from '@material-ui/core';

interface props {
  nonSticky?: boolean
  onNext?: () => void
  onBack?: () => void
}

export default function({
  nonSticky,
  onNext,
  onBack
}: props) {
  return (
    <div className={cn({'ac-multibtn-wrapper-fixed': !nonSticky}, {'ac-multibtn-wrapper': nonSticky})}>
      <Button 
        className='ac-multibtn' 
        style={{
          backgroundColor: '#376B6D', 
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
          戻　る
      </Button>
      <Button 
        className='ac-multibtn' 
        style={{
          backgroundColor: '#376B6D', 
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
          次　へ
      </Button>
    </div>
  )
}