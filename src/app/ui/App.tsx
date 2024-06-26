import React, {useEffect} from 'react'
import 'app/ui/App.module.css'
import {useAppSelector} from 'app/store'
import CircularProgress from '@mui/material/CircularProgress'
import {ErrorSnackbars} from 'common/components'
import {authThunks} from "features/auth/model/authSlice";
import {useActions} from "common/hooks/useActions";
import {Routing} from "app/ui/App/Routing/Routing";
import s from 'app/ui/App.module.css'
import {selectAuthIsInitialized} from "features/auth/model/authSelectors";
import {Header} from "./App/Header/Header";


type Props = {
  // demo?: boolean
}

// export const App=({ demo = false }: Props)=> {
export const App=(props: Props)=> {
  const isInitialized = useAppSelector<boolean>(selectAuthIsInitialized)
  const {initializeApp}=useActions(authThunks)

/*
  useEffect(() => {
    if (demo) {
      return
    }
    // debugger
    initializeApp()
  }, [])
*/
  useEffect(() => {
    // debugger
    if (!isInitialized) {
      initializeApp()
    }
  }, [])

  if (!isInitialized) {
    return (
      <div className={s.circularProgress}>
        <CircularProgress />
      </div>
    )
  }
  console.log('321')
  return (
    <>
      <ErrorSnackbars />
      <Header />
      <Routing demo={false}/>
    </>
  )
}

