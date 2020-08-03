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
  return (
    <div style={{ 
      textAlign: 'center', 
      width: '145px', 
      height: '125px', 
      position: 'relative',
      marginBottom: titlePos === 'bottom' ? '15px' : 0 }}>
      {titlePos === 'top' && (
        <div style={{ 
          fontSize: '16px',
          color: Colors.RED,
          lineHeight: '18px' }}>
            {title}
        </div>
      )}
      <img src={icon} style={imgStyle} alt='symbol' />
      {titlePos === 'bottom' && (
        <div style={{ 
          fontSize: '16px',
          color: Colors.RED,
          lineHeight: '18px',
          position: 'absolute',
          top: '100px',
          width: '100%' }}>
            {title}
        </div>
      )} 
      <div className='font-hira' style={{
        color: Colors.RED,
        fontSize: '30px', 
        position: 'absolute', top: titlePos === 'top' ? '25px' : '10px',
        marginLeft: '15px'
      }}>
        <span style={{ fontSize: '70px' }}>
          {typeof(content) === 'number' && unit !== '%' ? content.toFixed(1): content}
        </span>{unit}
      </div>
    </div>
  )
}