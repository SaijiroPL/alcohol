import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import QuestionTitle from 'components/QuestionTitle'
import Drink from 'components/Drink'
import CustomDrink from 'components/Drink/custom'
import MultiButton from 'components/MultiButton'

import { DrinkVolume, OtherDrink } from 'types/drinks'
import { DrinkProps } from 'types/pages'
import { DRINK_INFO } from 'const/drinks'
import * as Icons from 'const/icons'

import './styles.css';

export default function({
  drinks
}: DrinkProps) {
  const history = useHistory()
  const [otherDrinks, setOtherDrinks] = useState<OtherDrink[]>([])

  function onNext() {
    history.push("/question/4");
  }
  function onBack() {
    history.push("/question/2");
  }
  function onAddExtra() {
    const newObj: OtherDrink = {alcohol: 9, volume: 500};
    setOtherDrinks(prev => [...prev, newObj])
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={3} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>飲酒をする時は、平均してどのくらいの量を飲みますか？</div>
      </div>
      {DRINK_INFO.map((item, index) => (
        <Drink drink={item} />  
      ))}
      {otherDrinks.map((item, index) => (
        <CustomDrink icon={Icons.extra} title='その他のお酒' value1={9} value2={500} />
      ))}
      <div className='ac-drink-extrabtn-wrapper'>
        <Button className='ac-drink-extrabtn' onClick={onAddExtra} style={{
            backgroundColor: '#AAAAAA', 
            color: 'white', 
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}>
            <AddCircleOutlineIcon />
            <span style={{ marginLeft: '10px' }}>その他のお酒を追加</span>
          </Button>
      </div>
      <MultiButton nonSticky={true} onNext={onNext} onBack={onBack} />
    </div>
  )
}