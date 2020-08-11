export function typedAction<T extends string>(type: T): { type: T }
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload }
}

type ReportState = {
  daily: number,
  rank: number,
  score: number
}

const initStates: ReportState = {
  daily: 0,
  rank: 0,
  score: 0
}

export const setDaily = (daily: number) => typedAction('report/daily', daily)
export const setRank = (rank: number) => typedAction('report/rank', rank)
export const setScore = (score: number) => typedAction('report/score', score)

type ReportAction = ReturnType<
  typeof setDaily |
  typeof setRank |
  typeof setScore
>

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
    default:
      return state;
  }
}