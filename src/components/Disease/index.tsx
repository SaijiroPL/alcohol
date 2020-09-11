import React from 'react'

import * as Colors from 'const/colors'
import './styles.css';

interface props {
  icon: string
  content: string | number
  unit: string
  title: string
  titlePos?: 'top' | 'bottom'
  imgStyle?: any
}

export default function({
  icon,
  imgStyle,
  content,
  unit,
  title,
  titlePos = 'top'
}: props) {
  function renderContent(content: any) {
    if (typeof(content) === 'number') {
      if (unit === '%')
        return content >= 10000 ? 'ND' : content
      else
        return content >= 10000 ? 'ND' : content.toFixed(1)
    } else {
      return content
    }
  }
  return (
    <div style={{ 
      textAlign: 'center', 
      width: '145px', 
      height: '125px', 
      position: 'relative',
      marginBottom: titlePos === 'bottom' ? '34px' : 0 }}>
      {titlePos === 'top' && (
        <div style={{ 
          fontSize: '16px',
          color: Colors.RED,
          lineHeight: '18px' }}>
            {title}
        </div>
      )}
      <img src={icon} style={{
        ...imgStyle,
        opacity: '0.3',
        position: 'absolute',
        width: '145px',
        height: '145px',
        top: '0', left: '0'
      }} alt='symbol' />
      {titlePos === 'bottom' && (
        <div style={{ 
          fontSize: '16px',
          color: Colors.RED,
          lineHeight: '18px',
          position: 'absolute',
          top: '125px',
          width: '100%' }}>
            {title}
        </div>
      )} 
      <div className='font-fira' style={{
        color: Colors.RED,
        fontSize: '30px', 
        position: 'absolute', top: titlePos === 'top' ? '35px' : '30px',
        width: '100%'
      }}>
        <span style={{ fontSize: '60px' }}>{renderContent(content)}</span>{unit}
      </div>
    </div>
  )
}