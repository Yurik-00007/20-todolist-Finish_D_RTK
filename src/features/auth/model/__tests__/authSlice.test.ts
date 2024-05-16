import {InitialAuthStateType} from 'features/auth/model/authSlice'

let startState: InitialAuthStateType

beforeEach(() => {
  startState = {
    isLoggedIn: false,
    isInitialized: false,
    captchaUrl: null as string | null,
  }
})

test('должен запустить тест', () => {
  expect(true).toBe(true);
});