import { AppRootStateType } from 'app/store'
export const selectAuthIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn
export const selectAuthIsInitialized = (state: AppRootStateType) => state.auth.isInitialized
export const selectAuthCaptchaUrl = (state: AppRootStateType) => state.auth.captchaUrl
