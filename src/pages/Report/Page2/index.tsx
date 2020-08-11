import React from 'react'
import { useHistory } from "react-router-dom";

import SingleButton from 'components/SingleButton'
import SelectedDrink from 'components/SelectedDrink'
import Chart from 'components/Chart'
import Rank from 'components/Chart/rank'

import { beerLight, extra, calendar } from 'const/icons'
import * as Colors from 'const/colors'
import './styles.css';

export default function() {
  const history = useHistory();
  function onNext() {
    history.push("/goal/3");
  }
  return (
    <div className='report-page-container'>
      <div className='report-title'>
        <span>あなたの飲酒量は</span>
      </div>
      <div 
        className='container-center-text' 
        style={{ 
          marginTop: '10px', 
          fontSize: '16px', 
          color: '#993333'
        }}>
        30 - 39歳の日本人男性で
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <Rank rank={30} style={{
          radius: 62,
          fontSizeUp: '65px',
          fontSizeDown: '18px'
        }}/>
      </div>
      <div className='container-center-text' style={{
        fontSize: '18px',
        marginTop: '15px',
      }}>
        <span className='report1-static-label'>死亡リスクの上昇する飲酒量</span>
      </div>
      <Chart rank={30} volume={55} />
      <div className='report-title' style={{ fontSize: '16px', letterSpacing: '0.1rem' }}>
        <span>一日の純アルコール摂取量</span>
      </div>
      <div className='container-center-text' style={{
        color: '#993333',
        fontSize: '22px',
        fontWeight: 'bold',
        marginTop: '16px'
      }}>
        4/7日  ×  96g  =  <span style={{ fontSize: '28px' }}>55g</span>
      </div>
      <div className='ac-drinks-container'>
        <SelectedDrink icon={calendar} type='飲酒頻度' alcohol='1週に4日' alcoholColor='red' />
        <SelectedDrink icon={beerLight} type='ビール' percent={5} volume={1500} unit='ml' alcohol={60} alcoholColor='red' />
        <SelectedDrink icon={extra} type='その他のお酒' percent={9} volume={500} unit='ml' alcohol={36} alcoholColor='red' />
      </div>
      <div className='container-center-text' style={{ fontSize: '14px', marginTop: '24px', marginBottom: '40px' }}>
        まだまだお酒の量が多いようです <br/>
        今の量を飲み続けるとどうなるでしょうか？
      </div>
      <SingleButton title='お酒による病気のリスクは？' color={Colors.RED} nonSticky={true} onClick={onNext} />
    </div>
  )
}
