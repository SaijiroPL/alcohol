import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from "react-router-dom"
import { Button } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ClipLoader from "react-spinners/ClipLoader"
import { useToasts } from 'react-toast-notifications'

import Rank from 'components/Chart/rank'
import Chart from 'components/Chart'
import Disease from 'components/Disease'
import MultiButton from 'components/MultiButton'
import Drink from 'components/Drink'
import CustomDrink from 'components/Drink/custom'
import Frequency from 'components/Drink/frequency'
import SingleButton from 'components/SingleButton'

import { DrinkProps } from 'types/pages'
import { DRINK_INFO } from 'const/drinks'
import * as Icons from 'const/icons'
import * as Colors from 'const/colors'
import { OtherDrink, DiseaseStat, DrinkVolume } from 'types/drinks';

import queryString from 'query-string'
import { loadStateFromFirebase, saveStateToFirebase } from 'firebase/instance'
import { useStore } from 'react-redux';
import { RootState } from 'store';
import { DISEASE_UI } from 'const/disease';

interface props extends DrinkProps {
  frequency: number
  rank: number
  newRank: number
  alcohol: number
  newAlcohol: number
  newDaily: number
  diseaseStat: DiseaseStat[]
  newDiseaseStat: DiseaseStat[]
  orgFrequency: number
  orgDrinks: {[key: string]: DrinkVolume}
  orgOtherDrinks: OtherDrink[]
  setFrequency: (frequency: number) => void
  setNewRank: (rank: number) => void
  initDrinks: (drinks: any) => void
  initOtherDrinks: (drinks: any) => void
  loadQ: (payload: any) => void
  loadR: (payload: any) => void
}

export default function({
  alcohol, newAlcohol, newDaily,
  rank, newRank,
  orgFrequency, orgDrinks, orgOtherDrinks,
  frequency, drinks, otherDrinks,
  diseaseStat, newDiseaseStat,
  setFrequency,
  setDrink, setOtherDrink,
  initDrinks, initOtherDrinks,
  loadQ, loadR
}: props) {
  const history = useHistory()
  const { addToast } = useToasts()
  const [isReset, showReset] = useState(false)
  const [loading, loaded] = useState(true)
  const resetRef = useRef(null)

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
    console.log('init')
    setFrequency(orgFrequency)
    initDrinks(orgDrinks)
    initOtherDrinks(orgOtherDrinks)
  }, [orgFrequency, orgDrinks, orgOtherDrinks, initDrinks, initOtherDrinks, setFrequency])

  const scrollToRef = (ref: any) => window.scrollTo(0, ref.current.offsetTop)
  const executeScroll = () => scrollToRef(resetRef)

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
    if (newAlcohol > alcohol) {
      addToast('目標飲酒量が現在の飲酒量を超過しました。', {
        appearance: 'error',
        autoDismiss: true,
      })
    } else {
      const key = saveStore()
      history.push(`/goal/6?key=${key}`);
    }
  }

  function onAddExtra() {
    const newObj: OtherDrink = {alcohol: 9, volume: 500};
    if (setOtherDrink) setOtherDrink({index: -1, drink: newObj})
  }
  function onRemoveExtra() {
    if (setOtherDrink) setOtherDrink({index: -2})
  }

  function reducePercent(index: number) {
    const orgStat = Math.round(diseaseStat[index].stat * 10) / 10
    const newStat = Math.round(newDiseaseStat[index].stat * 10) / 10
    const percent = Math.round((orgStat - newStat) / (orgStat - 1) * 100)
    return percent
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
              content={-reducePercent(i * 2)} 
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
                content={-reducePercent(i * 2 + 1)} 
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
    <div className='report-page-container'>
      <ClipLoader
        size={15}
        color={"#993333"}
        loading={loading}
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '35px' }}>
        <div style={{ height: '72px', marginTop: '15px' }}>
          <Rank rank={rank} style={{
            radius: 36,
            fontSizeUp: '36px',
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
          <div style={{ marginTop: '10px', width: '150px' }}>
            <span style={{ 
              color: 'black', 
              fontSize: '16px', 
              fontWeight: 'bold', 
              borderBottom: '2px solid black' }}>
                {newDaily >= 0 && newDaily <= 20 && '節度ある飲酒量!'}
                {newDaily >= 21 && newDaily <= 40 && '生活習慣病リスクの上昇する飲酒量'}
                {newDaily >= 41 && newDaily <= 60 && '死亡リスクの上昇する飲酒量'}
                {newDaily >= 61 && '非常に危険な飲酒量'}
            </span>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '120px' }}>
        <Chart rank={rank} rank2={newRank} volume={alcohol} volume2={newAlcohol}  />
      </div>
      <div className='container-center-text' style={{ fontSize: '14px', marginTop: '40px', marginBottom: '20px' }}>
        減酒により、これだけのリスク改善が期待できます
      </div>
      {renderStats()}
      <MultiButton color='red' nonSticky={true} okayText='O K' cancelText='目標を見直す' onNext={onNext} 
        onBack={() => {
          showReset(true)
          setTimeout(() => {
            executeScroll()
          }, 500)
        }} />
      <div style={{ display: isReset ? 'block' : 'none' }}>
        <div ref={resetRef} className='container-center-text' style={{ fontSize: '18px', marginTop: '40px' }}>
          目標飲酒量を設定しましょう
        </div>
        <div style={{ paddingLeft: '20px', paddingRight: '20px' }}>
          <Frequency 
            icon={Icons.calendar} 
            title='飲酒頻度' 
            value1={frequency > 3 ? '週' : '月'} 
            value2={frequency > 3 ? frequency - 3 : frequency}
            updateValue={setFrequency} />
          {DRINK_INFO.map((item, index) => (
            <Drink key={index} info={item} value={drinks[item.id]} type='indirect' updateVolume={(key, value, isFirst) => {
              if (setDrink) setDrink({value: value, type: 'standard', key: key, isFirst: isFirst})
            }} />
          ))}
          {otherDrinks !== undefined && otherDrinks.map((item, index) => (
            <CustomDrink key={index} icon={Icons.extra} title='その他のお酒' value1={item.alcohol} value2={item.volume} 
              updateDrink={(percent, volume) => {
                if (setOtherDrink) setOtherDrink({
                  index: index, 
                  drink: {alcohol: percent, volume: volume}
                })
              }} 
            />
          ))}
        </div>
        {otherDrinks.length > 0 && (
          <div className='ac-drink-extrabtn-wrapper fade-in'>
            <Button className='ac-drink-extrabtn' onClick={onRemoveExtra} style={{
                backgroundColor: '#F0BABA', 
                color: 'white', 
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}>
                <RemoveCircleOutlineIcon />
                <span style={{ marginLeft: '10px' }}>その他のお酒を削除</span>
              </Button>
          </div>
        )}
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
        <SingleButton title='O     K' color={Colors.RED} nonSticky={true} onClick={() => showReset(false)} />
      </div>
    </div>
  )
}