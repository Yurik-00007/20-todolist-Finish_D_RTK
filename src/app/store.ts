import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducers',
    () => {
      store.replaceReducer(rootReducer)
    })
}

export const store = configureStore({
  reducer: rootReducer,
})


export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
