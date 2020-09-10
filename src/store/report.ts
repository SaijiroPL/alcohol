import { DrinkVolume, OtherDrink, StandardDrinkInfo, DiseaseStat } from 'types/drinks'
import { DRINK_INFO } from 'const/drinks'
import { RANKS } from 'const/ranks'
import { DISEASE_STAT } from 'const/disease'
import { calcRank, nextDisease } from 'engine'
import { stat } from 'fs'

export function typedAction<T extends string>(type: T): { type: T }
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload }
}

type ReportState = {
  age: number
  gender: number
  daily: number
  rank: number
  score: number
  disease: number[]
  diseaseStat: DiseaseStat[]
  newDaily: number
  newRank: number
  newScore: number
  newDisease: number[]
  newDiseaseStat: DiseaseStat[]
  newAlcohol: number
  frequency: number
  drinks: {[key: string]: DrinkVolume}
  otherDrinks: OtherDrink[]
  nextDrinks: {[key: string]: DrinkVolume}
  nextOtherDrinks: OtherDrink[]
  nextFrequency: number
  nextAlcohol: number
  will: string
  group: 'A' | 'B'
}

let initDrinkValues: {[key: string]: DrinkVolume} = {}
DRINK_INFO.map((item) => {
  initDrinkValues[item.id] = {
    id: item.id,
    volume: 0,
    volume2: 0
  }
})

const initStates: ReportState = {
  age: 20,
  gender: 0,
  daily: 0,
  rank: 0,
  score: 0,
  disease: [1, 1, 1, 1, 1, 1],
  diseaseStat: [],
  newDaily: 0,
  newRank: 0,
  newScore: 0,
  newDisease: [1, 1, 1, 1, 1, 1],
  newDiseaseStat: [],
  newAlcohol: 0,
  frequency: 0,
  drinks: initDrinkValues,
  otherDrinks: [],
  nextDrinks: initDrinkValues,
  nextOtherDrinks: [],
  nextFrequency: 0,
  nextAlcohol: 0,
  will: '',
  group: 'A'
}

export const setAge = (age: number) => typedAction('report/age', age)
export const setGender = (gender: number) => typedAction('report/gender', gender)
export const setDaily = (daily: number) => typedAction('report/daily', daily)
export const setRank = (rank: number) => typedAction('report/rank', rank)
export const setScore = (score: number) => typedAction('report/score', score)
export const setDisease = (disease: number[]) => typedAction('report/disease', disease)
export const setDiseaseStat = (stats: DiseaseStat[]) => typedAction('report/diseaseStat', stats)
export const setNewDaily = (daily: number) => typedAction('report/new/daily', daily)
export const setNewRank = (rank: number) => typedAction('report/new/rank', rank)
export const setNewScore = (score: number) => typedAction('report/new/score', score)
export const setNewDisease = (disease: number[]) => typedAction('report/new/disease', disease)
export const setFrequency = (frequency: number) => typedAction('report/frequency', frequency)
export const setNextFrequency = (frequency: number) => typedAction('report/nextfrequency', frequency)
export const setDrink = (payload: {value: number, type: 'standard' | 'custom', key: string, isFirst: boolean}) => typedAction('report/drink', payload)
export const setOtherDrink = (payload: {index: number, drink: OtherDrink}) => typedAction('report/otherdrink', payload)
export const setNextDrink = (payload: {value: number, type: 'standard' | 'custom', key: string, isFirst: boolean}) => typedAction('report/nextdrink', payload)
export const setNextOtherDrink = (payload: {index: number, drink: OtherDrink}) => typedAction('report/nextotherdrink', payload)
export const initDrinks = (payload: any) => typedAction('report/initdrink', payload)
export const initOtherDrinks = (payload: any) => typedAction('report/initotherdrink', payload)
export const initNextDrinks = (payload: any) => typedAction('report/initnextdrink', payload)
export const initNextOtherDrinks = (payload: any) => typedAction('report/initnextotherdrink', payload)
export const setWill = (will: string) => typedAction('report/will', will)
export const setGroup = (group: 'A' | 'B') => typedAction('report/group', group)

export const reset = () => typedAction('report/reset')
export const load = (payload: any) => typedAction('report/load', payload)

type ReportAction = ReturnType<
  typeof setAge |
  typeof setGender |
  typeof setDaily |
  typeof setRank |
  typeof setScore |
  typeof setDisease |
  typeof setDiseaseStat |
  typeof setNewDaily |
  typeof setNewRank |
  typeof setNewScore |
  typeof setNewDisease |
  typeof setFrequency |
  typeof setNextFrequency |
  typeof setDrink |
  typeof setOtherDrink |
  typeof setNextDrink |
  typeof setNextOtherDrink |
  typeof initDrinks |
  typeof initOtherDrinks |
  typeof initNextDrinks |
  typeof initNextOtherDrinks |
  typeof setWill |
  typeof setGroup |
  typeof reset |
  typeof load
>

function updateNewDecision(
  state: ReportState,
  type: 'first' | 'second'
) {
  const drinks = type === 'first' ? state.drinks : state.nextDrinks
  const otherDrinks = type === 'first' ? state.otherDrinks : state.nextOtherDrinks
  const frequency = type === 'first' ? state.frequency : state.nextFrequency

  console.log(drinks)

  function calcTotalAlcohol(item: StandardDrinkInfo) {
    const volume1 = item.volume1 * drinks[item.id].volume
    let volume2 = 0
    if (item.volume2) 
      volume2 = item.volume2 * drinks[item.id].volume2
    return (volume1 + volume2)
  }

  let alcohol = 0
  for (let i = 0; i < DRINK_INFO.length; ++i) {
    const item = DRINK_INFO[i]
    if (drinks[item.id].volume > 0 || drinks[item.id].volume2 > 0) {
      alcohol += calcTotalAlcohol(item) * item.percent * 0.8  / 100
    }
  }
  if (otherDrinks) {
    otherDrinks.forEach((item) => {
      alcohol += item.alcohol * item.volume * 0.8 / 100
    })
  }

  alcohol = Math.round(alcohol * 100) / 100

  let dailyAmt = 0;
  if (frequency === 0) {
    dailyAmt = 0
  } else if (frequency > 0 && frequency <= 3) {
    dailyAmt = alcohol * frequency / 30
  } else {
    dailyAmt = alcohol * (frequency - 3) / 7
  }
  const newDaily = Math.ceil(dailyAmt)
  
  const newRank = calcRank(state.age, alcohol, state.gender)

  const disease = nextDisease(alcohol, state.gender, state.diseaseStat)

  if (type === 'first')
    return { ...state, newDaily: newDaily, newRank: newRank === 0 ? 1 : newRank, newAlcohol: alcohol, newDiseaseStat: disease}
  else
    return { ...state, newDaily: newDaily, newRank: newRank === 0 ? 1 : newRank, nextAlcohol: alcohol, newDiseaseStat: disease}
}

function updateDrink(state: ReportState, payload: any) {
  const drinks = state.drinks
  if (payload.isFirst)
    drinks[payload.key].volume = payload.value
  else 
    drinks[payload.key].volume2 = payload.value
  
  return updateNewDecision({ ...state, drinks: drinks }, 'first')
}

function updateOtherDrink(state: ReportState, payload: any) {
  const otherdrinks = state.otherDrinks
  if (payload.index < 0) {
    return updateNewDecision({ ...state, otherDrinks: [...state.otherDrinks, payload.drink] }, 'first')
  } else {
    otherdrinks[payload.index] = payload.drink
    return updateNewDecision({ ...state, otherDrinks: otherdrinks }, 'first')
  }
}

function updateNextDrink(state: ReportState, payload: any) {
  const drinks = state.nextDrinks
  if (payload.isFirst)
    drinks[payload.key].volume = payload.value
  else 
    drinks[payload.key].volume2 = payload.value
  
  return updateNewDecision({ ...state, drinks: drinks }, 'second')
}

function updateNextOtherDrink(state: ReportState, payload: any) {
  const otherdrinks = state.nextOtherDrinks
  if (payload.index < 0) {
    return updateNewDecision({ ...state, otherDrinks: [...state.otherDrinks, payload.drink] }, 'second')
  } else {
    otherdrinks[payload.index] = payload.drink
    return updateNewDecision({ ...state, otherDrinks: otherdrinks }, 'second')
  }
}

export function reportReducer(
  state = initStates,
  action: ReportAction
): ReportState {
  switch (action.type) {
    case 'report/age':
      return { ...state, age: action.payload }
    case 'report/gender':
      return { ...state, gender: action.payload }
    case 'report/score':
      return { ...state, score: action.payload }
    case 'report/rank':
      return { ...state, rank: action.payload }
    case 'report/daily':
      return { ...state, daily: action.payload }
    case 'report/disease':
      return { ...state, disease: action.payload }
    case 'report/diseaseStat':
      return { ...state, diseaseStat: action.payload }
    case 'report/new/score':
      return { ...state, newScore: action.payload }
    case 'report/new/rank':
      return { ...state, newRank: action.payload }
    case 'report/new/daily':
      return { ...state, newDaily: action.payload }
    case 'report/new/disease':
      return { ...state, newDisease: action.payload }
    case 'report/frequency':
      return updateNewDecision({ ...state, frequency: action.payload }, 'first')
    case 'report/nextfrequency':
      return updateNewDecision({ ...state, nextFrequency: action.payload }, 'second')
    case 'report/drink':
      return updateDrink(state, action.payload)
    case 'report/otherdrink':
      return updateOtherDrink(state, action.payload)
    case 'report/nextdrink':
      return updateNextDrink(state, action.payload)
    case 'report/nextotherdrink':
      return updateNextOtherDrink(state, action.payload)
    case 'report/initdrink':
      return { ...state, drinks: action.payload }
    case 'report/initotherdrink':
      return { ...state, otherDrinks: action.payload }
    case 'report/initnextdrink':
      return { ...state, nextDrinks: action.payload }
    case 'report/initnextotherdrink':
      return { ...state, nextOtherDrinks: action.payload }
    case 'report/will':
      return { ...state, will: action.payload }
    case 'report/group':
      return { ...state, group: action.payload }
    case 'report/reset':
      return initStates
    case 'report/load':
      let loadState = action.payload
      if (!action.payload.otherDrinks) {
        loadState = { ...loadState, otherDrinks: [] }
      } 
      if (!action.payload.nextOtherDrinks) {
        loadState = { ...loadState, nextOtherDrinks: [] }
      }
      return loadState
    default:
      return state;
  }
}