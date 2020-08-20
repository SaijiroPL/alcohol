import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@material-ui/core';

import Rank from 'components/Chart/rank'
import Chart from 'components/Chart'
import Disease from 'components/Disease'
import SingleButton from 'components/SingleButton'
import SelectedDrink from 'components/SelectedDrink'

import * as Icons from 'const/icons'
import * as Colors from 'const/colors'
import { DrinkVolume, OtherDrink, StandardDrinkInfo } from 'types/drinks';
import { DRINK_INFO } from 'const/drinks';
import { useStore } from 'react-redux';
import { RootState } from 'store';

import { dataRef } from 'firebase/instance'

interface props {
  question: number[]
  score: number
  alcohol: number
  newAlcohol: number
  question2: number
  rank: number
  daily: number
  newRank: number
  newDaily: number
  age: number
  gender: number
  drinks: {[key: string]: DrinkVolume}
  otherDrinks: OtherDrink[]
  newDrinks: {[key: string]: DrinkVolume}
  newOtherDrinks: OtherDrink[]
  disease: number[]
  newDisease: number[]
  will: string,
  group: 'A' | 'B'
}

export default function({
  question,
  score,
  alcohol, newAlcohol,
  daily, rank,
  newDaily, newRank,
  age, gender,
  drinks, otherDrinks,
  newDrinks, newOtherDrinks,
  disease, newDisease,
  will, group
}: props) {
  const [cycle, setCycle] = useState('')
  const refRoot = useRef<HTMLDivElement>(null)

  const store = useStore()
  function saveToFirebase() {
    const state: RootState = store.getState()
    dataRef.push().set({
      question: state.question,
      report: state.report,
      date: new Date().toString()
    });
  }

  useEffect(() => {
    if (question[0] === 0) {
      setCycle('')
    } else if (question[0] > 0 && question[0] <= 3) {
      setCycle(`1月に${question[0]}日`)
    } else {
      setCycle(`1週に${question[0] - 3}日`)
    }
  }, [])

  function formatDate() {
    const now = new Date()
    return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`
  }

  function renderStandardDrink(item: StandardDrinkInfo) {
    function calcTotalAlcohol(item: StandardDrinkInfo) {
      const volume1 = item.volume1 * drinks[item.id].volume
      let volume2 = 0
      if (item.volume2) 
        volume2 = item.volume2 * drinks[item.id].volume2
      return (volume1 + volume2)
    }
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

  function reducePercent(index: number) {
    return Math.round((disease[index] - newDisease[index]) / (disease[index] - 1) * 100)
  }
  return (
    <div className='report-page-container' style={{ padding: '10px' }} ref={refRoot}>
      <div className='font-kans container-center-text' style={{
        color: '#993333',
        fontSize: '20px',
      }}>
        お酒の飲み方を振り返る
      </div>
      <div className='font-kans container-center-text' style={{
        color: 'black',
        fontSize: '14px',
        paddingTop: '5px'
      }}>
        {formatDate()}
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '4' }}>
          <Button 
            style={{
              backgroundColor: '#993333', 
              color: 'white', 
              borderRadius: 20,
              padding: '3px 10px',
              marginTop: '30px'
            }}>
              飲酒度チェック
          </Button>
          <div style={{ color: '#993333', marginTop: '24px', display: 'flex' }}>
            <img src={Icons.faceIcon} alt='face' style={{ width: '50px',height: '50px', marginRight: '7px' }} />
            <span className='font-hira' style={{ fontSize: '45px' }} >{score}</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold', alignSelf: 'flex-end', marginBottom: '5px' }}>点</span>
          </div>
        </div>
        <div style={{ flex: '6', marginLeft: '10px' }}>
          <p style={{ fontSize: '16px', color: '#993333' }}>
            {score >= 8 && score < 15 && ('問題のある飲酒群')}
            {score >= 15 && score < 20 && ('危険な飲酒群')}
            {score >= 20 && ('アルコール依存症疑い群')}
          </p>
          <p style={{ fontSize: '14px' }}>アルコールが原因ですでに <br/>大きな危害を体験しています</p>
          <p style={{ fontSize: '16px', color: '#993333' }}>特に問題となる要素</p>
          <p style={{ fontSize: '14px' }}>
          {(question[0] > 0) && (<span><img src={Icons.tick} alt='tick' className='tick-icon' />1日あたりの飲酒量<br/></span>)}
          {(question[1] / 10 > 0) && (<span><img src={Icons.tick} alt='tick' className='tick-icon' />飲酒頻度<br/></span>)}
          {(question[2] > 0) && (<span><img src={Icons.tick} alt='tick' className='tick-icon' />飲酒のコントロール<br/></span>)}
          {(question[3] > 0) && (<span><img src={Icons.tick} alt='tick' className='tick-icon' />仕事や生活への影響<br/></span>)}
          {(question[4] > 0) && (<span><img src={Icons.tick} alt='tick' className='tick-icon' />朝の迎え酒<br/></span>)}
          {(question[5] > 0) && (<span><img src={Icons.tick} alt='tick' className='tick-icon' />罪悪感<br/></span>)}
          {(question[6] > 0) && (<span><img src={Icons.tick} alt='tick' className='tick-icon' />記憶の欠損<br/></span>)}
          {(question[7] > 0) && (<span><img src={Icons.tick} alt='tick' className='tick-icon' />自身や周囲の怪我<br/></span>)}
          {(question[8] > 0) && (<span><img src={Icons.tick} alt='tick' className='tick-icon' />周囲の心配<br/></span>)}
          </p>
        </div>
      </div>
      {group === 'A' && (
        <>
          <div>
            <Button 
              style={{
                backgroundColor: '#993333', 
                color: 'white', 
                borderRadius: 20,
                padding: '3px 10px',
                marginTop: '30px'
              }}>
                現在の飲酒量
            </Button>
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
            <Chart rank={rank} volume={alcohol} />
            <div className='ac-drinks-container'>
              <SelectedDrink icon={Icons.calendar} type='飲酒頻度' alcohol={cycle} alcoholColor='red' />
              {DRINK_INFO.map((item) => (
                (drinks[item.id].volume > 0 || drinks[item.id].volume2 > 0) && renderStandardDrink(item)))}
              {otherDrinks.map((item) => renderOtherDrink(item))}
            </div>
          </div>
          <div>
            <Button 
              style={{
                backgroundColor: Colors.RED, 
                color: 'white', 
                borderRadius: 20,
                padding: '3px 10px',
                marginTop: '30px'
              }}>
                これからの飲酒目標
            </Button>
            <div 
              className='container-center-text' 
              style={{ 
                marginTop: '10px', 
                fontSize: '16px', 
                color: Colors.BLACK
              }}>
              {Math.floor((age - 20) / 5) * 5 + 20} - {Math.floor((age - 20) / 5) * 5 + 24}歳の日本人{gender === 0 ? '男性' : '女性'}で
            </div>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <Rank rank={newRank} style={{
                radius: 62,
                fontSizeUp: '65px',
                fontSizeDown: '18px'
              }}/>
            </div>
            <div className='container-center-text' style={{
              color: Colors.BLACK,
              fontSize: '18px',
              marginTop: '15px',
            }}>
              <span style={{ borderBottom: 'solid 2px ' + Colors.BLACK }}>
                {daily >= 0 && daily <= 20 && '節度ある飲酒量!'}
                {daily >= 21 && daily <= 40 && '生活習慣病リスクの上昇する飲酒量'}
                {daily >= 41 && daily <= 60 && '死亡リスクの上昇する飲酒量'}
                {daily >= 61 && '非常に危険な飲酒量'}
              </span> <br/>
              <span>
                を目指します
              </span>
            </div>
            <Chart rank2={newRank} volume2={newAlcohol} />
            <div className='ac-drinks-container'>
              <SelectedDrink icon={Icons.calendar} type='飲酒頻度' alcohol={cycle} alcoholColor='red' />
              {DRINK_INFO.map((item) => (
                (newDrinks[item.id].volume > 0 || newDrinks[item.id].volume2 > 0) && renderStandardDrink(item)))}
              {newOtherDrinks.map((item) => renderOtherDrink(item))}
            </div>
          </div>
          <div>
            <Button 
              style={{
                backgroundColor: '#993333', 
                color: 'white', 
                borderRadius: 20,
                padding: '3px 10px',
                marginTop: '30px'
              }}>
                減酒による効果
            </Button>
            <div className='container-center-text' style={{ marginTop: '20px', fontSize: '14px' }}>
              目標の飲酒量を続けることで、これだけの <br/>病気のリスク低下に繋がります
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <div>
                <Disease icon={Icons.life} content={-reducePercent(0)} unit='%' title='死亡リスク' titlePos='bottom' />
                <div style={{ textAlign: 'center' }}>
                  {disease[0]}倍 
                  <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
                  {newDisease[0]}倍
                </div>
              </div>
              <div>
                <Disease icon={Icons.ambulance} content={-reducePercent(1)} unit='%' title='アルコール関連疾患リスク' titlePos='bottom' />
                <div style={{ textAlign: 'center' }}>
                  {disease[1]}倍 
                  <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
                  {newDisease[1]}倍
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <div>
                <Disease icon={Icons.liver} content={-reducePercent(2)} unit='%' title='肝臓がんリスク' titlePos='bottom' />
                <div style={{ textAlign: 'center' }}>
                  {disease[2]}倍 
                  <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
                  {newDisease[2]}倍
                </div>
              </div>
              <div>
                <Disease icon={Icons.esophagus} content={-reducePercent(3)} unit='%' title='食道がんリスク' titlePos='bottom' />
                <div style={{ textAlign: 'center' }}>
                  {disease[3]}倍
                  <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
                  {newDisease[3]}倍
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
              <div>
                <Disease icon={Icons.pancreatitis} content={-reducePercent(4)} unit='%' title='膵炎リスク' titlePos='bottom' />
                <div style={{ textAlign: 'center' }}>
                  {disease[4]}倍
                  <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
                  {newDisease[4]}倍
                </div>
              </div>
              <div>
                <Disease icon={Icons.brain} content={-reducePercent(5)} unit='%' title='脳卒中リスク' titlePos='bottom' />
                <div style={{ textAlign: 'center' }}>
                  {disease[5]}倍 
                  <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
                  {newDisease[5]}倍
                </div>
              </div>
            </div>
          </div>          
        </>
      )}
      <div>
        <div className='container-center-text'>
          <Button 
            style={{
              backgroundColor: '#993333', 
              color: 'white', 
              borderRadius: 20,
              padding: '3px 10px',
              marginTop: '30px'
            }}>
              減酒への意気込み
          </Button>
          <div style={{ color: '#993333', marginTop: '16px', fontWeight: 'bold', lineHeight: '30px' }}>
            <span style={{ fontSize: '16px' }}>私は、</span> <br/>
            <span style={{ fontSize: '22px' }}>{will}</span> <br/>
            <span style={{ fontSize: '16px' }}>お酒を減らします！</span> <br/>
          </div>
        </div>
        <div className='container-center-text' style={{ fontSize: '16px', lineHeight: '30px', marginBottom: '20px' }}>
          がんばってください！
        </div>
      </div>
      <SingleButton title='レポートを保存して終了する' color={Colors.RED} nonSticky={true} onClick={saveToFirebase} />
      <SingleButton title='保存しないで終了する' color={Colors.WHITE} nonSticky={true} textColor={Colors.PALEGREEN} />
    </div>
  )
}
