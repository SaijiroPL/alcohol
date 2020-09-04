import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
import { OtherDrink } from 'types/drinks';

import queryString from 'query-string'
import { loadStateFromFirebase, saveStateToFirebase } from 'firebase/instance'
import { useStore } from 'react-redux';
import { RootState } from 'store';

interface props extends DrinkProps {
  frequency: number
  rank: number
  newRank: number
  alcohol: number,
  newAlcohol: number,
  disease: number[]
  newDisease: number[]
  setFrequency: (frequency: number) => void
  setNewRank: (rank: number) => void
  initDrinks: (drinks: any) => void
  initOtherDrinks: (drinks: any) => void
  loadQ: (payload: any) => void
  loadR: (payload: any) => void
}

export default function({
  frequency,
  alcohol, newAlcohol,
  rank, newRank,
  drinks, otherDrinks,
  disease, newDisease,
  setFrequency,
  setDrink, setOtherDrink,
  initDrinks, initOtherDrinks,
  loadQ, loadR
}: props) {
  const history = useHistory()
  const [isReset, showReset] = useState(false)
  const [loading, loaded] = useState(true)
  const resetRef = useRef(null)

  useEffect(() => {
    initDrinks(drinks)
    initOtherDrinks(otherDrinks)
    setFrequency(frequency)
  }, [drinks, otherDrinks, frequency, initDrinks, initOtherDrinks, setFrequency])

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
    const key = saveStore()
    history.push(`/goal/6?key=${key}`);
  }

  function reducePercent(index: number) {
    const percent = Math.round((disease[index] - newDisease[index]) / (disease[index] - 1) * 100)
    if (disease[index] === 1) return 0
    return percent
  }
  function onAddExtra() {
    const newObj: OtherDrink = {alcohol: 9, volume: 500};
    if (setOtherDrink) setOtherDrink({index: -1, drink: newObj})
  }
  return (
    <div className='report-page-container'>
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
        <Chart rank={rank} rank2={newRank} volume={alcohol} volume2={newAlcohol}  />
      </div>
      <div className='container-center-text' style={{ fontSize: '14px', marginTop: '40px' }}>
        減酒により、これだけのリスク改善が期待できます
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
            <Drink key={index} info={item} value={drinks[item.id]} updateVolume={(key, value, isFirst) => {
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
        <SingleButton title='O     K' color={Colors.RED} nonSticky={true} onClick={() => showReset(false)} />
      </div>
    </div>
  )
}