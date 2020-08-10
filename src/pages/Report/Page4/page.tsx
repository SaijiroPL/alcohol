import React from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Rank from 'components/Chart/rank'
import Chart from 'components/Chart'
import Drink from 'components/Drink'
import CustomDrink from 'components/Drink/custom'
import Frequency from 'components/Drink/frequency'
import SingleButton from 'components/SingleButton'

import { StandardDrink, OtherDrink } from 'types/drinks'
import { DrinkProps } from 'types/pages'
import { DRINK_INFO } from 'const/drinks'
import * as Icons from 'const/icons'
import * as Colors from 'const/colors'

export default function({
  drinks
}: DrinkProps) {
  const history = useHistory()
  function onNext() {
    history.push("/goal/3");
  }
  function onBack() {
    history.push("/goal/5");
  }
  return (
    <div className='report-page-container'>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
        <div style={{ height: '72px', marginTop: '15px' }}>
          <Rank rank={30} style={{
            radius: 36,
            fontSizeUp: '36px',
            fontSizeDown: '12px'
          }}/>
        </div>
        <img src={Icons.arrowRight} alt='arrow' style={{ marginLeft: '15px', marginRight: '15px' }}/>
        <div style={{ height: '102px' }}>
          <Rank rank={94} style={{
            radius: 51,
            fontSizeUp: '50px',
            fontSizeDown: '16px'
          }}/>
          <div style={{ marginTop: '10px' }}>
            <span style={{ 
              color: 'black', 
              fontSize: '16px', 
              fontWeight: 'bold', 
              borderBottom: '2px solid black',
              marginLeft: '-40px' }}>
              死亡リスクの上昇する飲酒量
            </span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '120px' }}>
        <Chart rank={30} rank2={94} volume={55} volume2={6}  />
      </div>
      <div className='container-center-text' style={{ fontSize: '18px', marginTop: '40px' }}>
        目標飲酒量を設定しましょう
      </div>
      <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <Frequency icon={Icons.calendar} title='飲酒頻度' value1={'週'} value2={4} />
        {DRINK_INFO.map((item, index) => (
          <Drink drink={item} />  
        ))}
        <CustomDrink icon={Icons.extra} title='その他のお酒' value1={9} value2={500} /> 
      </div>
      <div className='ac-drink-extrabtn-wrapper'>
        <Button className='ac-drink-extrabtn' style={{
            backgroundColor: '#AAAAAA', 
            color: 'white', 
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}>
            <AddCircleOutlineIcon />
            <span style={{marginLeft: '10px'}}>その他のお酒を追加</span>
          </Button>
      </div>
      <SingleButton title='お酒による病気のリスクは？' color={Colors.RED} nonSticky={true} />
    </div>
  )
}