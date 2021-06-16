import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useToasts } from 'react-toast-notifications'

import SingleButton from 'components/SingleButton'
import SelectedDrink from 'components/SelectedDrink'
import Chart from 'components/Chart'
import Rank from 'components/Chart/rank'
import DropDown from 'components/DropDown'

import { DrinkVolume, OtherDrink, StandardDrinkInfo } from 'types/drinks'
import { calendar } from 'const/icons'
import * as Colors from 'const/colors'
import * as Icons from 'const/icons'
import { DRINK_INFO } from 'const/drinks'
import { calcRank } from 'engine'

import './styles.css';

import queryString from 'query-string'
import { loadStateFromFirebase, saveStateToFirebase } from 'firebase/instance'
import { useStore } from 'react-redux';
import { RootState } from 'store';

interface props {
  alcohol: number
  question2: number
  rank: number
  daily: number
  age: number
  gender: number
  drinks: {[key: string]: DrinkVolume}
  otherDrinks: OtherDrink[]
  group: 'A' | 'B'
  setRank: (score: number) => void
  setDaily: (daily: number) => void
  loadQ: (payload: any) => void
  loadR: (payload: any) => void
}

export default function({
  alcohol,
  question2,
  daily,
  rank,
  age, gender,
  drinks,
  otherDrinks,
  group,
  setRank,
  setDaily,
  loadQ, loadR
}: props) {
  const history = useHistory();
  const { addToast } = useToasts();

  const [cycle, setCycle] = useState('');
  const [loading, loaded] = useState(true);
  const [inputRank, setInputRank] = useState<number>(1);

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
    setRank(calcRank(age, alcohol, gender))
  }, [question2, age, alcohol, gender, setDaily, setRank])

  const store = useStore()
  function saveStore() {
    const key = queryString.parse(window.location.search).key?.toString()
    const state: RootState = store.getState()
    if (key) 
      saveStateToFirebase({
        question: state.question,
        report: state.report,
      }, key)
    return key
  }

  function onNext() {
    if (rank != inputRank) {
      addToast('画面上部をご確認ください。', {
        appearance: 'error',
        autoDismiss: true,
      })
      return;
    }
    const key = saveStore()
    if (group === 'A')
      history.push(`/goal/3?key=${key}`);
    else
      history.push(`/goal/4?key=${key}`);
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
      <ClipLoader
        size={15}
        color={"#993333"}
        loading={loading}
      />
      <div className='report-title'>
        <span>あなたの飲む日の飲酒量{alcohol}gは</span>
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
        </>
      )}
      <div className='report-title' style={{ fontSize: '16px', letterSpacing: '0.1rem' }}>
        <span style={{ fontWeight: 'bold' }}>1日平均の純アルコール摂取量</span>
      </div>
      <div className='container-center-text' style={{
        color: '#993333',
        fontSize: '22px',
        fontWeight: 'bold',
        marginTop: '16px'
      }}>
        {question2 >= 0 && question2 <= 3 && (`${question2}/30日`)}
        {question2 >= 4 && (`${question2 - 3}/7日`)}
          ×  {alcohol}g  =  <span style={{ fontSize: '28px' }}>{daily}g</span>
      </div>
      {group === 'A' && (
        <>
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
        </>
      )}
      <div className='ac-drinks-container'>
        <SelectedDrink icon={calendar} type='飲酒頻度' alcohol={cycle} alcoholColor='red' />
        {DRINK_INFO.map((item) => (
          (drinks[item.id].volume > 0 || drinks[item.id].volume2 > 0) && renderStandardDrink(item)))}
        {otherDrinks.map((item) => renderOtherDrink(item))}
      </div>
      <div className='container-center-text goal-confirm-text'>
        確認クイズ1 <br/>
        あなたの飲む日の飲酒量は20~24歳の日本人男性で100人中何位？
      </div>
      <DropDown value={inputRank} suffix='位' min={1} max={100} onValueChange={(value) => {
        setInputRank(value);
      }} />
      <div className='container-center-text' style={{ fontSize: '14px', marginTop: '24px', marginBottom: '40px' }}>
        {daily > 20 && 'まだまだお酒の量が多いようです'} <br/>
        今の量を飲み続けるとどうなるでしょうか？
      </div>
      <SingleButton
        title={group === 'A' ? 'お酒による病気のリスクは？' : '次へ'}
        color={Colors.RED}
        nonSticky={true}
        onClick={onNext}
      />
    </div>
  )
}
