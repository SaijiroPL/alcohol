import React from 'react'
import { useHistory } from "react-router-dom";

import SingleButton from 'components/SingleButton'
import { faceIcon } from 'const/icons'
import * as Colors from 'const/colors'
import './styles.css';

export default function() {
  const history = useHistory();
  function onNext() {
    history.push("/goal/2");
  }
  return (
    <div className='report-page-container'>
      <div className='report-title'>
        <span>おつかれさまでした!</span> <br/>
        <span>あなたの得点は</span>
      </div>
      <div className='face-icon-container'>
        <img src={faceIcon} alt='face' className='face-icon' />
      </div>
      <div className='report1-rank-container'>
        <span className='font-hira' style={{ fontSize: '80px' }} >19</span>
        <span style={{ fontSize: '30px', fontWeight: 'bold' }}>点</span>
      </div>
      <div className='container-center-text' style={{ fontSize: '24px' }}>
        <span className='report1-static-label'>危険の高い飲酒群</span>
      </div>
      <div className='container-center-text' style={{ marginTop: '15px', fontSize: '14px' }}>
        アルコールが原因で <br/>
        すでに大きな危害を体験しています
      </div>
      <div 
        className='container-center-text' 
        style={{ 
          marginTop: '33px', 
          fontSize: '16px', 
          letterSpacing: '0.3rem',
          color: '#993333'
        }}>
        特に問題となるのは
      </div>
      <div style={{ marginTop: '20px', fontSize: '14px'}}>
        <span style={{ display: 'block', margin: '0 auto', width: '110px', lineHeight: '1.5rem' }}>
          ✓ 記憶の欠損 <br/>
          ✓ 仕事への悪影響 <br/>
          ✓ 朝の迎え酒 <br/>
          ✓ 周囲の心配 <br/>
        </span>
      </div>
      <SingleButton title='あなたの飲酒量は？' color={Colors.RED} onClick={onNext} />
    </div>
  )
}