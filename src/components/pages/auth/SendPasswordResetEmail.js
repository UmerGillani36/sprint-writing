import { Alert, Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const SendPasswordResetEmail = () => {
    const [error , setError] = useState({
        status:false,
        msg:"",
        type:""
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email:data.get('email'),
        }
        if(actualData.email){
            console.log(actualData);
            document.getElementById('password-reset-email-form').reset();
            setError({status:'true' , msg:'Reset email sent successfuly.Check you mail.' , type:'success'});
        }else{
            setError({status:'true' , msg:'Email is requird' , type:'error'});
        }
    }
  return (
    <>
        <Grid container justifyContent='center'>
        <Grid item sm={6} xs={12}>
        <h1>Reset Password</h1>
        <Box component='form' noValidate sx={{mt: 1}} id='password-reset-email-form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address'></TextField>
        <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{mt:3,mb:2,px:5}}>
                Send
            </Button>
        </Box>
        {error.status ?         <Alert severity={error.type}>{error.msg}</Alert>
        : ''}
        </Box>
        </Grid>
        </Grid>
    </>
  )
}

export default SendPasswordResetEmail