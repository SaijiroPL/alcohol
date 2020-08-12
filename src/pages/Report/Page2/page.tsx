import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

import SingleButton from 'components/SingleButton'
import SelectedDrink from 'components/SelectedDrink'
import Chart from 'components/Chart'
import Rank from 'components/Chart/rank'

import { DrinkVolume, OtherDrink, StandardDrinkInfo } from 'types/drinks'
import { beerLight, extra, calendar } from 'const/icons'
import * as Colors from 'const/colors'
import * as Icons from 'const/icons'
import { DRINK_INFO } from 'const/drinks'
import { RANKS } from 'const/ranks'

import './styles.css';

interface props {
  alcohol: number
  question2: number
  score: number
  rank: number
  daily: number
  age: number
  gender: number
  drinks: {[key: string]: DrinkVolume}
  otherDrinks: OtherDrink[]
  setRank: (score: number) => void
  setDaily: (daily: number) => void
  group: 'A' | 'B'
}

export default function({
  alcohol,
  question2,
  daily,
  score,
  rank,
  age, gender,
  drinks,
  otherDrinks,
  group,
  setRank,
  setDaily
}: props) {
  const history = useHistory();

  const [cycle, setCycle] = useState('')

  useEffect(() => {
    let dailyAmt = 0;
    if (question2 === 0) {
      dailyAmt = 0
    } else if (question2 > 0 && question2 <= 3) {
      dailyAmt = alcohol * question2 / 30
      setCycle(`1月に${question2}日`)
    } else {
      dailyAmt = alcohol * (question2 - 3) / 7
      setCycle(`1週に${question2 - 3}日`)
    }
    setDaily(Math.ceil(dailyAmt))

    const ageLevel = Math.floor((age - 20) / 5)
    const drinkLevel = dailyAmt / 10
    let drinkIndex = 0
    if (drinkLevel <= 2) {
      drinkIndex = RANKS[gender][ageLevel].level12
    } else if (drinkLevel <= 4) {
      drinkIndex = RANKS[gender][ageLevel].level34
    } else if (drinkLevel <= 6) {
      drinkIndex = RANKS[gender][ageLevel].level56
    } else if (drinkLevel <= 9) {
      drinkIndex = RANKS[gender][ageLevel].level79
    } else {
      drinkIndex = RANKS[gender][ageLevel].level10
    }
    setRank(Math.ceil(drinkIndex * 100 / RANKS[gender][ageLevel].sum))
  })

  function onNext() {
    if (group === 'A')
      history.push("/goal/3");
    else
      history.push("/goal/4");
  }

  function calcTotalAlcohol(item: StandardDrinkInfo) {
    const volume1 = item.volume1 * drinks[item.id].volume
    let volume2 = 0
    if (item.volume2) 
      volume2 = item.volume2 * drinks[item.id].volume2
    return (volume1 + volume2)
  }

  function renderStandardDrink(item: StandardDrinkInfo) {
    const tVolume = calcTotalAlcohol(item)
    const alcohol = tVolume * item.percent * 0.8 / 100
    return (
      <SelectedDrink 
        icon={item.icon} 
        type={item.type} 
        percent={item.percent} 
        volume={tVolume} 
        unit='ml' 
        alcohol={alcohol} 
        alcoholColor='red' />
    )
  }

  function renderOtherDrink(item: OtherDrink) {
    return (
      <SelectedDrink 
        icon={Icons.extra} 
        type='その他のお酒' 
        percent={item.alcohol} 
        volume={item.volume} 
        unit='ml' 
        alcohol={item.alcohol * item.volume * 0.8 / 100} 
        alcoholColor='red' />
    )
  }

  return (
    <div className='report-page-container'>
      <div className='report-title'>
        <span>あなたの飲酒量は</span>
      </div>
      {group === 'A' && (
        <>
          <div 
            className='container-center-text' 
            style={{ 
              marginTop: '10px', 
              fontSize: '16px', 
              color: '#993333'
            }}>
            {Math.floor((age - 20) / 5) * 5 + 20} - {Math.floor((age - 20) / 5) * 5 + 24}歳の日本人{gender === 0 ? '男性' : '女性'}で
          </div>
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <Rank rank={rank} style={{
              radius: 62,
              fontSizeUp: '65px',
              fontSizeDown: '18px'
            }}/>
          </div>
          <div className='container-center-text' style={{
            fontSize: '18px',
            marginTop: '15px',
          }}>
            <span className='report1-static-label'>
              {daily >= 0 && daily <= 20 && '節度ある飲酒量!'}
              {daily >= 21 && daily <= 40 && '生活習慣病リスクの上昇する飲酒量'}
              {daily >= 41 && daily <= 60 && '死亡リスクの上昇する飲酒量'}
              {daily >= 61 && '非常に危険な飲酒量'}
            </span>
          </div>
          <Chart rank={rank} volume={daily} />
        </>
      )}
      <div className='report-title' style={{ fontSize: '16px', letterSpacing: '0.1rem' }}>
        <span>一日の純アルコール摂取量</span>
      </div>
      <div className='container-center-text' style={{
        color: '#993333',
        fontSize: '22px',
        fontWeight: 'bold',
        marginTop: '16px'
      }}>
        {question2 > 0 && question2 <= 3 && (`${question2}/30日`)}
        {question2 > 4 && (`${question2 - 3}/7日`)}
          ×  {alcohol}g  =  <span style={{ fontSize: '28px' }}>{daily}g</span>
      </div>
      <div className='ac-drinks-container'>
        <SelectedDrink icon={calendar} type='飲酒頻度' alcohol={cycle} alcoholColor='red' />
        {DRINK_INFO.map((item) => (
          (drinks[item.id].volume > 0 || drinks[item.id].volume2 > 0) && renderStandardDrink(item)))}
        {otherDrinks.map((item) => renderOtherDrink(item))}
      </div>
      <div className='container-center-text' style={{ fontSize: '14px', marginTop: '24px', marginBottom: '40px' }}>
        まだまだお酒の量が多いようです <br/>
        今の量を飲み続けるとどうなるでしょうか？
      </div>
      <SingleButton title='お酒による病気のリスクは？' color={Colors.RED} nonSticky={true} onClick={onNext} />
    </div>
  )
}
