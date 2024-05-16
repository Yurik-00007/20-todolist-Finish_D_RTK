import {createSlice, isAnyOf, isFulfilled} from '@reduxjs/toolkit'
import {createAppAsyncThunk} from 'common/utils'
import {clearTasksAndTodolists} from 'common/actions'
import {authAPI} from 'features/auth/api/authAPI'
import {ResultCode} from "common/enum/enum";
import {LoginParamsType} from "features/auth/api/authAPI.types";

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    isInitialized: false,
    captchaUrl: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCaptchaUrl.fulfilled, (state, action) => {
        state.captchaUrl = action.payload.captchaUrl
      })
      .addMatcher(
        isFulfilled(authThunks.login, authThunks.logout, authThunks.initializeApp),
        (state, action) => {
          state.isLoggedIn = action.payload.isLoggedIn;
        })
      .addMatcher(
        isAnyOf(authThunks.initializeApp.rejected, authThunks.initializeApp.fulfilled),
        (state, action) => {
          state.isInitialized = true
        });
  }
})


// thunks


const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    const res = await authAPI.login(arg)
    if (res.data.resultCode === ResultCode.Succeed) {
      return {isLoggedIn: true}
    } else {
      debugger
      if (res.data.resultCode === ResultCode.Captcha_Failed) {
        await dispatch(authThunks.getCaptchaUrl())
      }
      return rejectWithValue(res.data)
    }
  })


export const logout = createAppAsyncThunk<{
  isLoggedIn: boolean
}, undefined>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    const res = await authAPI.logout()
    if (res.data.resultCode === ResultCode.Succeed) {
      dispatch(clearTasksAndTodolists({todolists: [], tasks: {}}))
      return {isLoggedIn: false}
    } else {
      return rejectWithValue(res.data)
    }
  })

export const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/initializeApp`,
  async (_, {rejectWithValue}) => {
    const res = await authAPI.meAuth()

    if (res.data.resultCode === ResultCode.Succeed) {
      return {isLoggedIn: true}
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const getCaptchaUrl = createAppAsyncThunk<{ captchaUrl: null | string }, void>(
  `${slice.name}/getCaptchaUrl`,
  async () => {
    const res = await authAPI.captcha()
    return {captchaUrl: res.data.url}
  }
)


//type
export type InitialAuthStateType = ReturnType<typeof slice.getInitialState>
export const authSlice = slice.reducer

export const authThunks = {login, logout, initializeApp, getCaptchaUrl}
