import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { Button } from '@material-ui/core';
import queryString from 'query-string'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

import QuestionTitle from 'components/QuestionTitle'
import Drink from 'components/Drink'
import CustomDrink from 'components/Drink/custom'
import MultiButton from 'components/MultiButton'

import { OtherDrink } from 'types/drinks'
import { DrinkProps } from 'types/pages'
import { DRINK_INFO } from 'const/drinks'
import { PAGE_INFOES } from 'const/selections'
import * as Icons from 'const/icons'
import { loadStateFromFirebase, saveStateToFirebase } from 'firebase/instance'

import './styles.css';
import { useStore } from 'react-redux';
import { RootState } from 'store';

export default function({
  drinks,
  otherDrinks,
  setDrink,
  setOtherDrink,
  loadState
}: DrinkProps) {
  const history = useHistory()
  const [update, forceUpdate] = React.useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
    const key = queryString.parse(window.location.search).key?.toString()
    if (key) {
      const ref = loadStateFromFirebase(key)
      ref.on('value', (snapshot) => {
        loadState(snapshot.val().question)
      })
    }
    forceUpdate(prev => prev++)
  }, [])

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
    history.push(`/question/4?key=${key}`);
  }
  function onBack() {
    const key = queryString.parse(window.location.search).key?.toString()
    history.push(`/question/2?key=${key}`);
  }
  function onAddExtra() {
    const newObj: OtherDrink = {alcohol: 9, volume: 500};
    if (setOtherDrink) setOtherDrink({index: -1, drink: newObj})
  }
  function onRemoveExtra() {
    if (setOtherDrink) setOtherDrink({index: -2})
  }

  return (
    <div className='ac-question-container'>
      <QuestionTitle sequence={3} />
      <div className='ac-question-content'>
        <div className='ac-question-text'>{PAGE_INFOES[2].title}</div>
      </div>
      {DRINK_INFO.map((item, index) => (
        <Drink key={index} info={item} value={drinks[item.id]} type='direct' updateVolume={(key, value, isFirst) => {
          if (setDrink) setDrink({value: value, type: 'standard', key: key, isFirst: isFirst})
        }} />
      ))}
      {otherDrinks.map((item, index) => (
        <CustomDrink key={`cd-${index}`} icon={Icons.extra} title='その他のお酒' value1={item.alcohol} value2={item.volume} updateDrink={(percent, volume) => {
          if (setOtherDrink) setOtherDrink({
            index: index, 
            drink: {alcohol: percent, volume: volume}})
        }} />
      ))}
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
            <span style={{ marginLeft: '10px' }}>その他のお酒を追加</span>
          </Button>
      </div>
      <MultiButton nonSticky={true} onNext={onNext} onBack={onBack} />
    </div>
  )
}