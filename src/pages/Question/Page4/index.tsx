import React from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import QuestionTitle from 'components/QuestionTitle'
import SelectedDrink from 'components/SelectedDrink'
import MultiButton from 'components/MultiButton'
import MultiChoice from 'components/MultiChoice'

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
  const selections = [
    'なし',
    '月1回未満',
    '毎月',
    '月に2，3回',
    '毎週',
    '週に2，3回',
    'ほぼ毎日',
  ]
  function onNext() {
    history.push("/question/5");
  }
  function onBack() {
    history.push("/question/3");
  }
  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={4} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>あなたは飲酒時に平均 <span style={{ fontWeight: 'bold', fontSize: '24px' }}>96</span>g の<br/>純アルコールを摂取しています。 </div>
      </div>
      <div className='ac-drinks-container'>
        <SelectedDrink icon={beerLight} type='ビール' percent={5} volume={1500} unit='ml' alcohol={60} />
        <SelectedDrink icon={extra} type='その他のお酒' percent={9} volume={500} unit='ml' alcohol={36} />
      </div>
      <div className='ac-question-content'>
        <div className='ac-question-text' style={{ width: '300px' }}>
          一度に純アルコール60g以上の飲酒を<br/>することがどれくらいの頻度であり<br/>ますか？
        </div>
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
            <span style={{ marginLeft: '10px', fontSize: '14px' }}>純アルコール約60gのめやす</span>
          </Button>
      </div>
      <div className='ac-page4-description'>
        ビール、チューハイ(5%) 1.5L / <br/>
        ビール、チューハイ(9%) 833ml / <br/>
        焼酎水割り(6:4) グラス 3杯  /  ウイスキー ダブル 3杯 <br/>
        日本酒 3合   /  ワイン 1ボトル弱 <br/>
        のいずれか
      </div>
      <MultiChoice options={selections} elementStyle={{ margin: '10px' }} columns={2}/>
      <MultiButton nonSticky={true} onNext={onNext} onBack={onBack} />
    </div>
  )
}