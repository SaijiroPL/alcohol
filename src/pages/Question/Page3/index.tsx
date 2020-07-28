import React from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import QuestionTitle from 'components/QuestionTitle'
import Drink from 'components/Drink'
import CustomDrink from 'components/Drink/custom'
import MultiButton from 'components/MultiButton'

import beerLight from 'svgs/beer_light.svg';
import beerStrong from 'svgs/beer_strong.svg';
import chuhai from 'svgs/chuhai.svg'
import chuhaiStrong from 'svgs/chuhai_strong.svg'
import jpWine from 'svgs/japanese_wine.svg'
import awamori from 'svgs/awamori.svg'
import shochuStrong from 'svgs/shochu_strong.svg'
import shochu from 'svgs/shochu.svg'
import shochuLight from 'svgs/shochu_light.svg'
import wine from 'svgs/wine.svg'
import umeshurokku from 'svgs/umeshurokku.svg'
import uisukidaburu from 'svgs/uisukidaburu.svg'
import haiboru from 'svgs/haiboru.svg'
import extra from 'svgs/extra.svg'

import './styles.css';

export default function() {
  const history = useHistory()
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={3} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>飲酒をする時は、平均してどのくらいの量を飲みますか？</div>
      </div>
      <Drink icon={beerLight} type='ビール' subType='アルコール度数' percent={5} volume1={350} volume2={500} unit='杯' />
      <Drink icon={beerStrong} type='ビール' subType='ストロング' percent={9} volume1={350} volume2={500} unit='杯' />
      <Drink icon={chuhai} type='ビール' percent={5} volume1={350} volume2={500} unit='杯' />
      <Drink icon={chuhaiStrong} type='ビール' subType='ストロング' percent={9} volume1={350} volume2={500} unit='杯' />
      <Drink icon={jpWine} type='日本酒' percent={15} volume1='' unit='合' />
      <Drink icon={awamori} type='泡盛(生地)' percent={25} volume1='グラス' unit='杯' />
      <Drink icon={shochuStrong} type='焼酎水割り' subType='濃いめ' percent={15} volume1='グラス' unit='杯' />
      <Drink icon={shochu} type='焼酎水割り' percent={12.5} volume1='グラス' unit='杯' />
      <Drink icon={shochuLight} type='焼酎水割り' subType='うすめ' percent={10} volume1='グラス' unit='杯' />
      <Drink icon={wine} type='ワイン' percent={12} volume1={200} unit='杯' />
      <Drink icon={umeshurokku} type='梅酒ロック' percent={15} volume1={180} unit='杯' />
      <Drink icon={uisukidaburu} type='ウイスキーダブル' percent={43} volume1={60} unit='杯' />
      <Drink icon={haiboru} type='ハイボール' percent={7} volume1={350} volume2={500} unit='杯' />
      <CustomDrink icon={extra} />
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
      <MultiButton nonSticky={true} />
    </div>
  )
}