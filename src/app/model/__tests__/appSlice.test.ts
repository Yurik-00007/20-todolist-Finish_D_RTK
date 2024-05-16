import {appActions, appSlice, InitialAppStateType, RequestStatusType} from 'app/model/appSlice'

let startState: InitialAppStateType

beforeEach(() => {
  startState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string,

  }
})

test('should set error and reset status to "loading"', () => {
  const endState = appSlice(startState, appActions.setAppError({ error: 'Some error' }))

  expect(endState.status).toBe('loading')
  expect(endState.error).toBe('Some error')
  expect(startState.error).toBe(null)
})

