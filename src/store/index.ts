import { combineReducers } from 'redux'
import { questionReducer } from './question'

export const rootReducer = combineReducers({
  question: questionReducer
})

export type RootState = ReturnType<typeof rootReducer>