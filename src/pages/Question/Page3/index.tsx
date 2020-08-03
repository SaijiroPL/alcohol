import React from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import QuestionTitle from 'components/QuestionTitle'
import Drink from 'components/Drink'
import CustomDrink from 'components/Drink/custom'
import MultiButton from 'components/MultiButton'

import * as Icons from 'const/icons'

import './styles.css';

export default function() {
  const history = useHistory()
  function onNext() {
    history.push("/question/4");
  }
  function onBack() {
    history.push("/question/2");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={3} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>飲酒をする時は、平均してどのくらいの量を飲みますか？</div>
      </div>
      <Drink icon={Icons.beerLight} type='ビール' subType='アルコール度数' percent={5} volume1={350} volume2={500} unit='杯' />
      <Drink icon={Icons.beerStrong} type='ビール' subType='ストロング' percent={9} volume1={350} volume2={500} unit='杯' />
      <Drink icon={Icons.chuhai} type='ビール' percent={5} volume1={350} volume2={500} unit='杯' />
      <Drink icon={Icons.chuhaiStrong} type='ビール' subType='ストロング' percent={9} volume1={350} volume2={500} unit='杯' />
      <Drink icon={Icons.jpWine} type='日本酒' percent={15} volume1='' unit='合' />
      <Drink icon={Icons.awamori} type='泡盛(生地)' percent={25} volume1='グラス' unit='杯' />
      <Drink icon={Icons.shochuStrong} type='焼酎水割り' subType='濃いめ' percent={15} volume1='グラス' unit='杯' />
      <Drink icon={Icons.shochu} type='焼酎水割り' percent={12.5} volume1='グラス' unit='杯' />
      <Drink icon={Icons.shochuLight} type='焼酎水割り' subType='うすめ' percent={10} volume1='グラス' unit='杯' />
      <Drink icon={Icons.wine} type='ワイン' percent={12} volume1={200} unit='杯' />
      <Drink icon={Icons.umeshurokku} type='梅酒ロック' percent={15} volume1={180} unit='杯' />
      <Drink icon={Icons.uisukidaburu} type='ウイスキーダブル' percent={43} volume1={60} unit='杯' />
      <Drink icon={Icons.haiboru} type='ハイボール' percent={7} volume1={350} volume2={500} unit='杯' />
      <CustomDrink icon={Icons.extra} title='その他のお酒' value1={9} value2={500} />
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
            <span style={{ marginLeft: '10px' }}>その他のお酒を追加</span>
          </Button>
      </div>
      <MultiButton nonSticky={true} onNext={onNext} onBack={onBack} />
    </div>
  )
}