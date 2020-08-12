import { DrinkVolume, OtherDrink, StandardDrinkInfo } from 'types/drinks'
import { DRINK_INFO } from 'const/drinks'
import { RANKS } from 'const/ranks'

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
  newDaily: number
  newRank: number
  newScore: number
  newDisease: number[]
  frequency: number
  drinks: {[key: string]: DrinkVolume}
  otherDrinks: OtherDrink[]
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
  age: 25,
  gender: 0,
  daily: 55,
  rank: 30,
  score: 19,
  disease: [1.2, 2.0, 1.1, 2.4, 1.6, 1.8],
  newDaily: 6,
  newRank: 94,
  newScore: 0,
  newDisease: [1.1, 1.62, 1.05, 1.43, 1.33, 1.43],
  frequency: 6,
  drinks: initDrinkValues,
  otherDrinks: [],
  will: '',
  group: 'A'
}

export const setAge = (age: number) => typedAction('report/age', age)
export const setGender = (gender: number) => typedAction('report/gender', gender)
export const setDaily = (daily: number) => typedAction('report/daily', daily)
export const setRank = (rank: number) => typedAction('report/rank', rank)
export const setScore = (score: number) => typedAction('report/score', score)
export const setDisease = (disease: number[]) => typedAction('report/disease', disease)
export const setNewDaily = (daily: number) => typedAction('report/new/daily', daily)
export const setNewRank = (rank: number) => typedAction('report/new/rank', rank)
export const setNewScore = (score: number) => typedAction('report/new/score', score)
export const setNewDisease = (disease: number[]) => typedAction('report/new/disease', disease)
export const setFrequency = (frequency: number) => typedAction('report/frequency', frequency)
export const setDrink = (payload: {value: number, type: 'standard' | 'custom', key: string, isFirst: boolean}) => typedAction('report/drink', payload)
export const setOtherDrink = (payload: {index: number, drink: OtherDrink}) => typedAction('report/otherdrink', payload)
export const initDrinks = (payload: any) => typedAction('report/initdrink', payload)
export const initOtherDrinks = (payload: any) => typedAction('report/initotherdrink', payload)
export const setWill = (will: string) => typedAction('report/will', will)
export const setGroup = (group: 'A' | 'B') => typedAction('report/group', group)

type ReportAction = ReturnType<
  typeof setDaily |
  typeof setRank |
  typeof setScore |
  typeof setDisease |
  typeof setNewDaily |
  typeof setNewRank |
  typeof setNewScore |
  typeof setNewDisease |
  typeof setFrequency |
  typeof setDrink |
  typeof setOtherDrink |
  typeof initDrinks |
  typeof initOtherDrinks |
  typeof setWill |
  typeof setGroup
>

function updateNewDecision(
  state: ReportState
) {
  function calcTotalAlcohol(item: StandardDrinkInfo) {
    const volume1 = item.volume1 * drinks[item.id].volume
    let volume2 = 0
    if (item.volume2) 
      volume2 = item.volume2 * drinks[item.id].volume2
    return (volume1 + volume2)
  }

  const drinks = state.drinks
  const otherDrinks = state.otherDrinks
  const frequency = state.frequency

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

  let dailyAmt = 0;
  if (frequency === 0) {
    dailyAmt = 0
  } else if (frequency > 0 && frequency <= 3) {
    dailyAmt = alcohol * frequency / 30
  } else {
    dailyAmt = alcohol * (frequency - 3) / 7
  }
  const newDaily = Math.ceil(dailyAmt)

  const ageLevel = Math.floor((state.age - 20) / 5)
  const drinkLevel = alcohol / 10
  let drinkIndex = 0
  if (drinkLevel <= 2) {
    drinkIndex = RANKS[state.gender][ageLevel].level12
  } else if (drinkLevel <= 4) {
    drinkIndex = RANKS[state.gender][ageLevel].level34
  } else if (drinkLevel <= 6) {
    drinkIndex = RANKS[state.gender][ageLevel].level56
  } else if (drinkLevel <= 9) {
    drinkIndex = RANKS[state.gender][ageLevel].level79
  } else {
    drinkIndex = RANKS[state.gender][ageLevel].level10
  }
  const newRank = Math.ceil(drinkIndex * RANKS[state.gender][ageLevel].sum / 100)

  return { ...state, newDaily: newDaily, newRank: newRank }
}

function updateDrink(state: ReportState, payload: any) {
  const drinks = state.drinks
  if (payload.isFirst)
    drinks[payload.key].volume = payload.value
  else 
    drinks[payload.key].volume2 = payload.value
  
  return updateNewDecision({ ...state, drinks: drinks })
}

function updateOtherDrink(state: ReportState, payload: any) {
  const otherdrinks = state.otherDrinks
  if (payload.index < 0) {
    return updateNewDecision({ ...state, otherDrinks: [...state.otherDrinks, payload.drink] })
  } else {
    otherdrinks[payload.index] = payload.drink
    return updateNewDecision({ ...state, otherDrinks: otherdrinks })
  }
}

export function reportReducer(
  state = initStates,
  action: ReportAction
): ReportState {
  switch (action.type) {
    case 'report/score':
      return { ...state, score: action.payload }
    case 'report/rank':
      return { ...state, rank: action.payload }
    case 'report/daily':
      return { ...state, daily: action.payload }
    case 'report/disease':
      return { ...state, disease: action.payload }
    case 'report/new/score':
      return { ...state, newScore: action.payload }
    case 'report/new/rank':
      return { ...state, newRank: action.payload }
    case 'report/new/daily':
      return { ...state, newDaily: action.payload }
    case 'report/new/disease':
      return { ...state, newDisease: action.payload }
    case 'report/frequency':
      return { ...state, frequency: action.payload }
    case 'report/drink':
      return updateDrink(state, action.payload)
    case 'report/otherdrink':
      return updateOtherDrink(state, action.payload)
    case 'report/initdrink':
      return { ...state, drinks: action.payload }
    case 'report/initotherdrink':
      return { ...state, otherDrinks: action.payload }
    case 'report/will':
      return { ...state, will: action.payload }
    case 'report/group':
      return { ...state, group: action.payload }
    default:
      return state;
  }
}