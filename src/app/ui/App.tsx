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

export const App=()=> {
  const isInitialized = useAppSelector<boolean>(selectAuthIsInitialized)
  const {initializeApp}=useActions(authThunks)

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
  return (
    <>
      <ErrorSnackbars />
      <Header />
      <Routing demo={false}/>
    </>
  )
}

