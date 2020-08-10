import { DrinkVolume } from 'types/drinks'

export function typedAction<T extends string>(type: T): { type: T }
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload }
}

type GlobalState = {
  age: number
  question1: number
  question2: number
  question4: number
  question5: number
  question6: number
  question7: number
  question8: number
  question9: number
  question10: number
  question11: number
  drinks: DrinkVolume[]
}

const initStates: GlobalState = {
  age: 20,
  question1: -1,
  question2: -1,
  question4: -1,
  question5: -1,
  question6: -1,
  question7: -1,
  question8: -1,
  question9: -1,
  question10: -1,
  question11: -1,
  drinks: []
}

export const setAge = (age: number) => typedAction('question/age', age)
export const setAnswer1 = (answer: number) => typedAction('question/answer1', answer)
export const setAnswer2 = (answer: number) => typedAction('question/answer2', answer)
export const setAnswer4 = (answer: number) => typedAction('question/answer4', answer)
export const setAnswer5 = (answer: number) => typedAction('question/answer5', answer)
export const setAnswer6 = (answer: number) => typedAction('question/answer6', answer)
export const setAnswer7 = (answer: number) => typedAction('question/answer7', answer)
export const setAnswer8 = (answer: number) => typedAction('question/answer8', answer)
export const setAnswer9 = (answer: number) => typedAction('question/answer9', answer)
export const setAnswer10 = (answer: number) => typedAction('question/answer10', answer)
export const setAnswer11 = (answer: number) => typedAction('question/answer11', answer)

type QuestionAction = ReturnType<typeof setAge | 
  typeof setAnswer1 | 
  typeof setAnswer2 |
  typeof setAnswer4 |
  typeof setAnswer5 |
  typeof setAnswer6 |
  typeof setAnswer7 |
  typeof setAnswer8 |
  typeof setAnswer9 |
  typeof setAnswer10 |
  typeof setAnswer11>

export function questionReducer(
  state = initStates,
  action: QuestionAction
): GlobalState {
  switch (action.type) {
    case 'question/age':
      return { ...state, age: action.payload }
    case 'question/answer1':
      return { ...state, question1: action.payload }
    case 'question/answer2':
      return { ...state, question2: action.payload }
    case 'question/answer4':
      return { ...state, question4: action.payload }
    case 'question/answer5':
      return { ...state, question5: action.payload }
    case 'question/answer6':
      return { ...state, question6: action.payload }
    case 'question/answer7':
      return { ...state, question7: action.payload }
    case 'question/answer8':
      return { ...state, question7: action.payload }
    case 'question/answer9':
      return { ...state, question7: action.payload }
    case 'question/answer10':
      return { ...state, question7: action.payload }
    case 'question/answer11':
      return { ...state, question7: action.payload }
    default:
      return state;
  }
}