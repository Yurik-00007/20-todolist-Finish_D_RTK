import React, {memo} from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AppBar from '@mui/material/AppBar'
import {useAppSelector} from 'app/store'
import {selectAuthIsLoggedIn} from 'features/auth/model/authSelectors'
import {authThunks} from "features/auth/model/authSlice";
import {useActions} from "common/hooks/useActions";
import LinearProgress from "@mui/material/LinearProgress";
import {RequestStatusType} from "app/model/appSlice";
import {selectAppStatus} from "app/model/appSelectors";

export const Header = memo(() => {
  const isLoggedIn = useAppSelector<boolean>(selectAuthIsLoggedIn)
  const status = useAppSelector<RequestStatusType>(selectAppStatus)


  const {logout}=useActions(authThunks)


  const logoutHandler = () => {
    logout()
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Todolist</Typography>
        {isLoggedIn && (
          <Button color="inherit" onClick={logoutHandler}>
            Log out
          </Button>
        )}
      </Toolbar>
      {status === 'loading' && <LinearProgress color="secondary" />}
    </AppBar>
  )
})
