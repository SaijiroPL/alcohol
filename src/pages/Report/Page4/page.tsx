import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClipLoader from "react-spinners/ClipLoader";
import { useToasts } from 'react-toast-notifications'

import Rank from 'components/Chart/rank'
import Chart from 'components/Chart'
import Drink from 'components/Drink'
import CustomDrink from 'components/Drink/custom'
import Frequency from 'components/Drink/frequency'
import SingleButton from 'components/SingleButton'

import { DrinkProps } from 'types/pages'
import { DRINK_INFO } from 'const/drinks'
import * as Icons from 'const/icons'
import * as Colors from 'const/colors'
import { OtherDrink } from 'types/drinks'

import queryString from 'query-string'
import { loadStateFromFirebase, saveStateToFirebase } from 'firebase/instance'
import { useStore } from 'react-redux';
import { RootState } from 'store';

interface props extends DrinkProps {
  frequency: number,
  rank: number,
  newRank: number,
  alcohol: number,
  newAlcohol: number,
  group: 'A' | 'B',
  setNextFrequency: (frequency: number) => void
  setNewDaily: (daily: number) => void
  setNewRank: (rank: number) => void
  initNextDrinks: (drinks: any) => void
  initNextOtherDrinks: (drinks: any) => void
  loadQ: (payload: any) => void
  loadR: (payload: any) => void
}

export default function({
  frequency,
  alcohol,
  newAlcohol,
  rank,
  drinks,
  otherDrinks,
  newRank,
  group,
  setDrink,
  setOtherDrink,
  setNextFrequency,
  initNextDrinks,
  initNextOtherDrinks,
  loadQ, loadR
}: props) {
  const history = useHistory()
  const [tutorial, setTutorial] = useState(group === 'A' ? 0 : 2)
  const [loading, loaded] = useState(true)

  const store = useStore()
  const { addToast } = useToasts()

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
    if (newAlcohol > alcohol) {
      addToast('目標飲酒量が現在の飲酒量を超過しました。', {
        appearance: 'error',
        autoDismiss: true,
      })
    } else {

      const key = saveStore()
      if (group === 'A')
        history.push(`/goal/5?key=${key}`);
      else
        history.push(`/goal/6?key=${key}`);
    }
  }

  function onAddExtra() {
    const newObj: OtherDrink = {alcohol: 9, volume: 500};
    if (setOtherDrink) setOtherDrink({index: -1, drink: newObj})
  }

  return (
    <div className='report-page-container'>
      <ClipLoader
        size={15}
        color={"#993333"}
        loading={loading}
      />
      {group === 'A' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '35px' }}>
            <div style={{ height: '72px', marginTop: '15px' }}>
              <Rank rank={rank} style={{
                radius: 36,
                fontSizeUp: '32px',
                fontSizeDown: '12px'
              }}/>
            </div>
            <img src={Icons.arrowRight} alt='arrow' style={{ marginLeft: '15px', marginRight: '15px' }}/>
            <div style={{ height: '102px' }}>
              <Rank rank={newRank} style={{
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
                    {newAlcohol >= 0 && newAlcohol <= 20 && '節度ある飲酒量!'}
                    {newAlcohol >= 21 && newAlcohol <= 40 && '生活習慣病リスクの上昇する飲酒量'}
                    {newAlcohol >= 41 && newAlcohol <= 60 && '死亡リスクの上昇する飲酒量'}
                    {newAlcohol >= 61 && '非常に危険な飲酒量'}
                </span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: '120px' }}>
            <Chart rank={rank} volume={alcohol}/>
          </div>          
        </>
      )}
      <div className='container-center-text' style={{ fontSize: '18px', marginTop: '40px' }}>
        目標飲酒量を設定しましょう
      </div>
      <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
        <Frequency 
          icon={Icons.calendar} 
          title='飲酒頻度' 
          value1={frequency > 3 ? '週' : '月'} 
          value2={frequency > 3 ? frequency - 3 : frequency}
          updateValue={setNextFrequency} />
        {DRINK_INFO.map((item, index) => (
          <Drink key={index} info={item} value={drinks[item.id]} type='indirect' updateVolume={(key, value, isFirst) => {
            if (setDrink) setDrink({value: value, type: 'standard', key: key, isFirst: isFirst})
          }} />
        ))}
        {otherDrinks !== undefined && otherDrinks.map((item, index) => (
          <CustomDrink key={index} icon={Icons.extra} title='その他のお酒' value1={item.alcohol} value2={item.volume} updateDrink={(percent, volume) => {
            if (setOtherDrink) setOtherDrink({
              index: index, 
              drink: {alcohol: percent, volume: volume}})
          }} />
        ))}
      </div>
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
            <span style={{marginLeft: '10px'}}>その他のお酒を追加</span>
          </Button>
      </div>
      <SingleButton title='お酒による病気のリスクは？' color={Colors.RED} nonSticky={true} onClick={onNext} />
      {tutorial === 0 && (
        <div style={{ 
          position: 'absolute', width: '100%', height: '380px', top: 0, 
          background: Colors.RED_TRANS,
          textAlign: 'center',
          color: 'white', fontWeight: 'bold' }}
          onClick={() => setTutorial(1)}>
          <div style={{ fontSize: '30px', marginTop: '80px' }}>減酒目標を <br/> 立てましょう</div>
          <div style={{ fontSize: '22px', marginTop: '30px', marginBottom: '30px' }}>これからの飲酒頻度と <br/> 飲酒量を設定すると</div>
          <img src={Icons.arrowDownWhite} alt='arrow'/>
          <div style={{ fontSize: '14px', marginTop: '40px' }}>画面をタップ</div>
        </div>
      )}
      {tutorial === 1 && (
        <div style={{ 
          position: 'absolute', width: '100%', height: 'calc(100% - 380px)', top: '380px', 
          background: Colors.RED_TRANS,
          textAlign: 'center',
          color: 'white', fontWeight: 'bold' }}
          onClick={() => setTutorial(2)}>
            <img src={Icons.arrowUpWhite} alt='arrow' style={{ marginTop: '20px' }}/>
            <div style={{ fontSize: '28px', marginTop: '30px' }}>順位と純アルコール量が<br/> 変化します</div>
            <div style={{ fontSize: '14px', marginTop: '30px' }}>画面をタップ</div>
        </div>
      )}
    </div>
  )
}