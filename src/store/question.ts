import { DrinkVolume, OtherDrink } from 'types/drinks'
import { DRINK_INFO } from 'const/drinks'

export function typedAction<T extends string>(type: T): { type: T }
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload }
}

type QuestionState = {
  age: number
  question1: number
  question2: number
  alcohol: number
  drinks: {[key: string]: DrinkVolume}
  otherDrinks: OtherDrink[]
  question4: number
  question5: number
  question6: number
  question7: number
  question8: number
  question9: number
  question10: number
  question11: number
  question12: number[]
}

let initDrinks: {[key: string]: DrinkVolume} = {}
DRINK_INFO.map((item) => {
  initDrinks[item.id] = {
    id: item.id,
    volume: 0,
    volume2: 0
  }
})

const initStates: QuestionState = {
  age: 25,
  question1: 0,
  question2: 6,
  alcohol: 30,
  drinks: initDrinks,
  otherDrinks: [],
  question4: 2,
  question5: 0,
  question6: 1,
  question7: 2,
  question8: 0,
  question9: 1,
  question10: 2,
  question11: 1,
  question12: []
}

export const setAge = (age: number) => typedAction('question/age', age)
export const setAnswer1 = (answer: number) => typedAction('question/answer1', answer)
export const setAnswer2 = (answer: number) => typedAction('question/answer2', answer)
export const setDrink = (payload: {value: number, type: 'standard' | 'custom', key: string, isFirst: boolean}) => typedAction('question/drink', payload)
export const setOtherDrink = (payload: {index: number, drink: OtherDrink}) => typedAction('question/otherdrink', payload)
export const setAlcohol = (alcohol: number) => typedAction('question/alcohol', alcohol)
export const setAnswer4 = (answer: number) => typedAction('question/answer4', answer)
export const setAnswer5 = (answer: number) => typedAction('question/answer5', answer)
export const setAnswer6 = (answer: number) => typedAction('question/answer6', answer)
export const setAnswer7 = (answer: number) => typedAction('question/answer7', answer)
export const setAnswer8 = (answer: number) => typedAction('question/answer8', answer)
export const setAnswer9 = (answer: number) => typedAction('question/answer9', answer)
export const setAnswer10 = (answer: number) => typedAction('question/answer10', answer)
export const setAnswer11 = (answer: number) => typedAction('question/answer11', answer)
export const setAnswer12 = (answer: number[]) => typedAction('question/answer12', answer)

type QuestionAction = ReturnType<typeof setAge | 
  typeof setAnswer1 | 
  typeof setAnswer2 |
  typeof setDrink |
  typeof setOtherDrink |
  typeof setAlcohol |
  typeof setAnswer4 |
  typeof setAnswer5 |
  typeof setAnswer6 |
  typeof setAnswer7 |
  typeof setAnswer8 |
  typeof setAnswer9 |
  typeof setAnswer10 |
  typeof setAnswer11 |
  typeof setAnswer12>

function updateDrink(state: QuestionState, payload: any) {
  const drinks = state.drinks
  if (payload.isFirst)
    drinks[payload.key].volume = payload.value
  else 
    drinks[payload.key].volume2 = payload.value
  return { ...state, drinks }
}

function updateOtherDrink(state: QuestionState, payload: any) {
  const otherdrinks = state.otherDrinks
  if (payload.index < 0) {
    return { ...state, otherDrinks: [...state.otherDrinks, payload.drink] }
  } else {
    otherdrinks[payload.index] = payload.drink
    return { ...state, otherDrinks: otherdrinks }
  }
}

export function questionReducer(
  state = initStates,
  action: QuestionAction
): QuestionState {
  switch (action.type) {
    case 'question/age':
      return { ...state, age: action.payload }
    case 'question/answer1':
      return { ...state, question1: action.payload }
    case 'question/answer2':
      return { ...state, question2: action.payload }
    case 'question/drink':
      return updateDrink(state, action.payload)
    case 'question/otherdrink':
      return updateOtherDrink(state, action.payload)
    case 'question/alcohol':
      return { ...state, alcohol: action.payload }
    case 'question/answer4':
      return { ...state, question4: action.payload }
    case 'question/answer5':
      return { ...state, question5: action.payload }
    case 'question/answer6':
      return { ...state, question6: action.payload }
    case 'question/answer7':
      return { ...state, question7: action.payload }
    case 'question/answer8':
      return { ...state, question8: action.payload }
    case 'question/answer9':
      return { ...state, question9: action.payload }
    case 'question/answer10':
      return { ...state, question10: action.payload }
    case 'question/answer11':
      return { ...state, question11: action.payload }
    case 'question/answer12':
      return { ...state, question12: action.payload }
    default:
      return state;
  }
}