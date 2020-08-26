import React, { useMemo } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';

import QuestionTitle from 'components/QuestionTitle'
import SelectedDrink from 'components/SelectedDrink'
import MultiButton from 'components/MultiButton'
import MultiChoice from 'components/MultiChoice'

import { QuestionProps } from 'types/pages'
import { DrinkVolume, OtherDrink, StandardDrinkInfo } from 'types/drinks'

import { DRINK_INFO } from 'const/drinks'
import { PAGE_INFOES } from 'const/selections'
import * as Icons from 'const/icons'

import './styles.css';

interface props extends QuestionProps {
  drinks: {[key: string]: DrinkVolume}
  otherDrinks: OtherDrink[]
  setAlcohol: (alcohol: number) => void
}

export default function({
  answer,
  drinks,
  otherDrinks,
  setAlcohol,
  setAnswer
}: props) {
  const history = useHistory()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  function calcTotalAlcohol(item: StandardDrinkInfo) {
    const volume1 = item.volume1 * drinks[item.id].volume
    let volume2 = 0
    if (item.volume2) 
      volume2 = item.volume2 * drinks[item.id].volume2
    return (volume1 + volume2)
  }

  const totalAlcohol = useMemo(() => {
    let sum = 0
    for (let i = 0; i < DRINK_INFO.length; ++i) {
      const item = DRINK_INFO[i]
      if (drinks[item.id].volume > 0 || drinks[item.id].volume2 > 0) {
        sum += calcTotalAlcohol(item) * item.percent * 0.8  / 100
      }
    }
    otherDrinks.forEach((item) => {
      sum += item.alcohol * item.volume * 0.8 / 100
    })
    setAlcohol(sum)
    return sum
  }, [])

  function onNext() {
    history.push("/question/5");
  }
  function onBack() {
    history.push("/question/3");
  }

  function renderStandardDrink(item: StandardDrinkInfo) {
    const tVolume = calcTotalAlcohol(item)
    const alcohol = tVolume * item.percent * 0.8 / 100
    return (
      <SelectedDrink 
        key={item.id}
        icon={item.icon} 
        type={item.type} 
        percent={item.percent} 
        volume={tVolume} 
        unit='ml' 
        alcohol={alcohol} 
        alcoholColor='green' />
    )
  }

  function renderOtherDrink(item: OtherDrink) {
    return (
      <SelectedDrink 
        key={item.alcohol + item.volume}
        icon={Icons.extra} 
        type='その他のお酒' 
        percent={item.alcohol} 
        volume={item.volume} 
        unit='ml' 
        alcohol={item.alcohol * item.volume * 0.8 / 100} 
        alcoholColor='green' />
    )
  }

  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={4} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>あなたは飲酒時に平均 <span style={{ fontWeight: 'bold', fontSize: '24px' }}>{totalAlcohol}</span>g の純アルコールを摂取しています。 </div>
      </div>
      <div className='ac-drinks-container'>
        {DRINK_INFO.map((item) => (
          (drinks[item.id].volume > 0 || drinks[item.id].volume2 > 0) && renderStandardDrink(item)))}
        {otherDrinks.map((item) => renderOtherDrink(item))}
      </div>
      <div className='ac-question-content'>
        <div className='ac-question-text' style={{ width: '300px' }}>
          一度に純アルコール60g以上の飲酒をすることがどれくらいの頻度でありますか？
        </div>
      </div>
      <div className='ac-drink-extrabtn-wrapper'>
        <span style={{ marginLeft: '10px', fontSize: '14px', color: '#707070', letterSpacing: '1.5px', borderBottom: '1px solid #707070' }}>
          純アルコール約<span style={{ fontSize: '18px', fontWeight: 'bold', marginLeft: '5px' }}>60</span>gのめやす
        </span>
      </div>
      <div className='ac-page4-description'>
        ビール、チューハイ(5%) 1.5L / <br/>
        ビール、チューハイ(9%) 833ml / <br/>
        焼酎水割り(6:4) グラス 3杯  /  ウイスキー ダブル 3杯 <br/>
        日本酒 3合   /  ワイン 1ボトル弱 <br/>
        のいずれか
      </div>
      <MultiChoice answer={answer} setAnswer={setAnswer} options={PAGE_INFOES[3].selections} elementStyle={{ margin: '10px' }} columns={2}/>
      <MultiButton nonSticky={true} onNext={onNext} onBack={onBack} />
    </div>
  )
}