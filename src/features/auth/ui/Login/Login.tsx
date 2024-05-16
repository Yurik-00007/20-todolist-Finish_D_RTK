import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {Navigate} from 'react-router-dom'
import {useLogin} from "features/auth/lib/useLogin";

export const Login = () => {
  const {formik, isLoggedIn, captchaUrl} = useLogin()

  if (isLoggedIn) {
    return <Navigate to={'/'}/>
  }
  console.log(captchaUrl)
  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered
                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                  {' '}
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p>Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                type="text"
                label="Email"
                margin="normal"
                {...formik.getFieldProps('email')}
                error={!!(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
                error={!!(formik.touched.password && formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              {formik.touched.password && formik.errors.password && <div>{formik.errors.password}</div>}
              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                  />
                }
              />
              {captchaUrl && <img src={captchaUrl} alt=""/>}
              {captchaUrl &&
                <TextField label="Captcha"
                           margin="normal"
                           {...formik.getFieldProps("captcha")} />
              }
              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                disabled={Object.keys(formik.errors).length > 0 || !formik.dirty}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}


