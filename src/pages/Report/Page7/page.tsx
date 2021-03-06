import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useStore } from 'react-redux'
import { RootState } from 'store'
import moment from 'moment'
import htmlToImage from 'html-to-image'
import download from 'downloadjs'
import ClipLoader from "react-spinners/ClipLoader";

import Rank from 'components/Chart/rank'
import Chart from 'components/Chart'
import Disease from 'components/Disease'
import SingleButton from 'components/SingleButton'
import SelectedDrink from 'components/SelectedDrink'

import * as Icons from 'const/icons'
import * as Colors from 'const/colors'
import { DrinkVolume, OtherDrink, StandardDrinkInfo, DiseaseStat } from 'types/drinks';
import { DRINK_INFO } from 'const/drinks';

import { dataRef } from 'firebase/instance'

import queryString from 'query-string'
import { loadStateFromFirebase } from 'firebase/instance'
import { DISEASE_UI } from 'const/disease';
import { reducePercent } from 'engine';

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
  diseaseStat: DiseaseStat[]
  newDiseaseStat: DiseaseStat[]
  will: string
  group: 'A' | 'B'
  frequency: number
  nextFrequency: number
  resetQuestion: () => void
  resetReport: () => void
  loadQ: (payload: any) => void
  loadR: (payload: any) => void
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
  diseaseStat, newDiseaseStat,
  will, group,
  frequency, nextFrequency,
  resetQuestion, resetReport,
  loadQ, loadR
}: props) {
  const [cycle, setCycle] = useState('')
  const [nextCycle, setNextCycle] = useState('')
  const [loading, loaded] = useState(true)
  const refRoot = useRef<HTMLDivElement>(null)
  const history = useHistory()

  useEffect(() => {
    console.log(newDrinks)
  }, [newDrinks])
  
  useEffect(() => {
    window.scrollTo(0, 0)
    const key = queryString.parse(window.location.search).key?.toString()
    if (key) {
      const ref = loadStateFromFirebase(key)
      ref.on('value', (snapshot) => {
        loadQ(snapshot.val().question)
        loadR(snapshot.val().report)
        loaded(false)
      })
    }
  }, [])

  const scoreLevel = useMemo(() => {
    if (score >= 8 && score < 15) {
      return 1
    } else if (score >= 15 && score < 20) {
      return 2
    } else if (score >= 20) {
      return 3
    }
    return 0
  }, [score])

  const store = useStore()
  function saveToFirebase() {
    const pageContainer = document.getElementsByClassName('report-page-container')[0] as HTMLElement
    htmlToImage.toPng(pageContainer)
    .then(function (dataUrl) {
      var img = new Image();
      img.src = dataUrl;
      download(dataUrl, `ALMIGHTPNF-${moment().format('YYYY-MM-DD HH:mm:ss')}.png`)
      finish()
    })
    .catch(function (error) {
      console.error('oops, something went wrong!', error)
      finish()
    })
  }

  function finish() {
    const state: RootState = store.getState()
    dataRef.push().set({
      question: state.question,
      report: state.report,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    resetQuestion()
    resetReport()
    history.push("/");
  }

  useEffect(() => {
    if (question[0] === 0) {
      setCycle('')
    } else if (question[0] > 0 && question[0] <= 3) {
      setCycle(`1月に${question[0]}日`)
    } else {
      setCycle(`1週に${question[0] - 3}日`)
    }

    if (nextFrequency === 0) {
      setNextCycle('')
    } else if (nextFrequency > 0 && nextFrequency <= 3) {
      setNextCycle(`1月に${nextFrequency}日`)
    } else {
      setNextCycle(`1週に${nextFrequency - 3}日`)
    }
  }, [question, nextFrequency])

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

  function renderNextStandardDrink(item: StandardDrinkInfo) {
    function calcTotalAlcohol(item: StandardDrinkInfo) {
      const volume1 = item.volume1 * newDrinks[item.id].volume
      let volume2 = 0
      if (item.volume2) 
        volume2 = item.volume2 * newDrinks[item.id].volume2
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

  function roundDisease(org: number) {
    if (org === 10000) return 'ND'
    return Math.round(org * 10) / 10
  }
  function renderStats() {
    let rows = []
    for (let i = 0; i < diseaseStat.length / 2; i++) {
      rows.push(
        (<div key={i} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
          <div>
            <Disease 
              key={i * 2}
              icon={DISEASE_UI[diseaseStat[i * 2].index].icon} 
              content={-reducePercent(i * 2, diseaseStat, newDiseaseStat)} 
              unit='%' 
              title={`${DISEASE_UI[diseaseStat[i * 2].index].name}リスク`}
              titlePos='bottom' />
            <div style={{ textAlign: 'center' }}>
              {roundDisease(diseaseStat[i * 2].stat)}倍 
              <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
              {roundDisease(newDiseaseStat[i * 2].stat)}倍 
            </div>
          </div>
          {(i * 2 + 1 < diseaseStat.length) && 
            <div>
              <Disease 
                key={i * 2 + 1}
                icon={DISEASE_UI[diseaseStat[i * 2 + 1].index].icon} 
                content={-reducePercent(i * 2 + 1, diseaseStat, newDiseaseStat)} 
                unit='%' 
                title={`${DISEASE_UI[diseaseStat[i * 2 + 1].index].name}リスク`}
                titlePos='bottom' />
              <div style={{ textAlign: 'center' }}>
                {roundDisease(diseaseStat[i * 2 + 1].stat)}倍 
                <img src={Icons.arrowRight} alt='arrow' className='ac-selecteddrink-arrow'/>
                {roundDisease(newDiseaseStat[i * 2 + 1].stat)}倍 
              </div>
            </div>}
        </div>)
      )
    }
    return rows
  }
  return (
    <div className='report-page-container' style={{ padding: '10px' }} ref={refRoot}>
      <ClipLoader
        size={15}
        color={"#993333"}
        loading={loading}
      />
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
            <img src={Icons.face[scoreLevel]} alt='face' style={{ width: '50px',height: '50px', marginRight: '7px' }} />
            <span className='font-fira' style={{ fontSize: '45px' }} >{score}</span>
            <span style={{ fontSize: '20px', fontWeight: 'bold', alignSelf: 'flex-end', marginBottom: '5px' }}>点</span>
          </div>
        </div>
        <div style={{ flex: '6', marginLeft: '10px' }}>
          <p style={{ fontSize: '16px', color: '#993333' }}>
            {scoreLevel === 1 && ('問題のある飲酒群')}
            {scoreLevel === 2 && score < 20 && ('危険な飲酒群')}
            {scoreLevel === 3 && ('アルコール依存症疑い群')}
          </p>
          {score > 8 && (<p style={{ fontSize: '14px' }}>アルコールが原因ですでに <br/>大きな危害を体験しています</p>)}
          <p style={{ fontSize: '16px', color: '#993333' }}>特に問題となる要素</p>
          <p style={{ fontSize: '14px' }}>
          {(question[0] > 0) && (<span><img src={Icons.tick} alt='tick' className='tick-icon' />1日あたりの飲酒量<br/></span>)}
          {(question[1] / 10 > 2) && (<span><img src={Icons.tick} alt='tick' className='tick-icon' />飲酒頻度<br/></span>)}
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
                {newDaily >= 0 && newDaily <= 20 && '節度ある飲酒量!'}
                {newDaily >= 21 && newDaily <= 40 && '生活習慣病リスクの上昇する飲酒量'}
                {newDaily >= 41 && newDaily <= 60 && '死亡リスクの上昇する飲酒量'}
                {newDaily >= 61 && '非常に危険な飲酒量'}
              </span> <br/>
              <span>
                を目指します
              </span>
            </div>
            <Chart rank2={newRank} volume2={newAlcohol} />
            <div className='ac-drinks-container'>
              <SelectedDrink icon={Icons.calendar} type='飲酒頻度' alcohol={nextCycle} alcoholColor='red' />
              {DRINK_INFO.map((item) => (
                (newDrinks[item.id].volume > 0 || newDrinks[item.id].volume2 > 0) && renderNextStandardDrink(item)))}
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
            {renderStats()}
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
            <span style={{ fontSize: '16px' }}>{will}ために</span> <br/>
            <span style={{ fontSize: '16px' }}>お酒を減らします！</span> <br/>
          </div>
        </div>
        <div className='container-center-text' style={{ fontSize: '16px', lineHeight: '30px', marginBottom: '20px' }}>
          がんばってください！
        </div>
      </div>
      <SingleButton title='レポートを保存して終了する' color={Colors.RED} nonSticky={true} onClick={saveToFirebase} />
      <SingleButton title='保存しないで終了する' color={Colors.WHITE} nonSticky={true} textColor={Colors.PALEGREEN} onClick={finish} />
    </div>
  )
}
