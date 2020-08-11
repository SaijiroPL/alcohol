import { combineReducers } from 'redux'
import { questionReducer } from './question'
import { reportReducer } from './report'

export const rootReducer = combineReducers({
  question: questionReducer,
  report: reportReducer
})

export type RootState = ReturnType<typeof rootReducer>