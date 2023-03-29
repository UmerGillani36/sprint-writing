import { Alert, Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  });
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      new_password: data.get('new_password'),
      confirm_password: data.get('confirm_password'),
    }
    if (actualData.new_password && actualData.confirm_password) {
      if (actualData.new_password === actualData.confirm_password) {
        console.log(actualData);
        document.getElementById('password-reset-form').reset();
        setError({ status: 'true', msg: 'Reset password successfuly.Redirecting to login page.', type: 'success' });
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        setError({ status: 'true', msg: 'Password does not match.', type: 'error' });
      }
    } else {
      setError({ status: 'true', msg: 'Enter password in both fields.', type: 'error' });
    }
  }
  return (
    <>
      <Grid container justifyContent='center'>
        <Grid item sm={6} xs={12}>
          <h1>Reset Password</h1>
          <Box component='form' noValidate sx={{ mt: 1 }} id='password-reset-form' onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth id='new_password' name='new_password' label='New password' type='password'></TextField>
            <TextField margin='normal' required fullWidth id='confirm_password' name='confirm_password' label='Confirm password' type='password'></TextField>
            <Box textAlign='center'>
              <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>
                Save
              </Button>
            </Box>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert>
              : ''}
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default ResetPasswordForm