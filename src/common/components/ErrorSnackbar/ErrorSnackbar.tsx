import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {useAppSelector} from 'app/store'
import {appActions} from 'app/model/appSlice'
import {selectAppError} from 'app/model/appSelectors'
import {useActions} from "common/hooks/useActions";
import {memo} from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert
(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbars = memo(() => {
  const error = useAppSelector<null | string>(selectAppError)
  const {setAppError}=useActions(appActions)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setAppError({ error: null })
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Stack>
  )
})
