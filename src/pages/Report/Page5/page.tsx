import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Rank from 'components/Chart/rank'
import Chart from 'components/Chart'
import Disease from 'components/Disease'
import MultiButton from 'components/MultiButton'
import Drink from 'components/Drink'
import CustomDrink from 'components/Drink/custom'
import Frequency from 'components/Drink/frequency'
import SingleButton from 'components/SingleButton'

import { DrinkProps } from 'types/pages'
import { DRINK_INFO } from 'const/drinks'
import * as Icons from 'const/icons'
import * as Colors from 'const/colors'

export default function({
  drinks
}: DrinkProps) {
  const history = useHistory()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  function onNext() {
    history.push("/goal/6");
  }
  function onBack() {
    history.push("/goal/4");
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
              borderBottom: '2px solid black' }}>
              節度ある飲酒量！
            </span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '120px' }}>
        <Chart rank={30} rank2={94} volume={55} volume2={6}  />
      </div>
      <div className='container-center-text' style={{ fontSize: '14px', marginTop: '40px' }}>
        減酒により、これだけのリスク改善が期待できます
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div>
          <Disease icon={Icons.life} content={-50} unit='%' title='死亡リスク' titlePos='bottom' />
          <div style={{ textAlign: 'center' }}>
            1.2倍 
            <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
            1.1倍
          </div>
        </div>
        <div>
          <Disease icon={Icons.ambulance} content={-38} unit='%' title='アルコール関連疾患リスク' titlePos='bottom' />
          <div style={{ textAlign: 'center' }}>
            1.2倍 
            <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
            1.1倍
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div>
          <Disease icon={Icons.liver} content={-50} unit='%' title='肝臓がんリスク' titlePos='bottom' />
          <div style={{ textAlign: 'center' }}>
            1.2倍 
            <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
            1.1倍
          </div>
        </div>
        <div>
          <Disease icon={Icons.esophagus} content={-69} unit='%' title='食道がんリスク' titlePos='bottom' />
          <div style={{ textAlign: 'center' }}>
            1.2倍 
            <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
            1.1倍
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <div>
          <Disease icon={Icons.pancreatitis} content={-47} unit='%' title='膵炎リスク' titlePos='bottom' />
          <div style={{ textAlign: 'center' }}>
            1.2倍 
            <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
            1.1倍
          </div>
        </div>
        <div>
          <Disease icon={Icons.brain} content={-46} unit='%' title='脳卒中リスク' titlePos='bottom' />
          <div style={{ textAlign: 'center' }}>
            1.2倍 
            <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
            1.1倍
          </div>
        </div>
      </div>
      <MultiButton color='red' nonSticky={true} okayText='O K' cancelText='再設定' onNext={onNext} onBack={onBack} />
      <div className='container-center-text' style={{ fontSize: '18px', marginTop: '40px' }}>
        目標飲酒量を設定しましょう
      </div>
      <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
        <Frequency icon={Icons.calendar} title='飲酒頻度' value1={'週'} value2={4} />
        {DRINK_INFO.map((item, index) => (
          <Drink key={index} info={item} value={drinks[item.id]} />
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
      <SingleButton title='O     K' color={Colors.RED} nonSticky={true} onClick={onNext} />
    </div>
  )
}