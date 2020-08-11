export function typedAction<T extends string>(type: T): { type: T }
export function typedAction<T extends string, P extends any>(
  type: T,
  payload: P
): { type: T; payload: P };
export function typedAction(type: string, payload?: any) {
  return { type, payload }
}

type ReportState = {
  score: number
}

const initStates: ReportState = {
  score: 0
}

export const setScore = (score: number) => typedAction('report/score', score)

type ReportAction = ReturnType<typeof setScore>

export function reportReducer(
  state = initStates,
  action: ReportAction
): ReportState {
  switch (action.type) {
    case 'report/score':
      return { ...state, score: action.payload }
    default:
      return state;
  }
}