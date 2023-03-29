import { Alert, Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

const ChangePassword = () => {
    const [error , setError] = useState({
        status:false,
        msg:"",
        type:""
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            password:data.get('password'),
            password_confirmation:data.get('password_confirmation'),
        }
        if(actualData.password && actualData.password_confirmation){
            if(actualData.password === actualData.password_confirmation){
                console.log(actualData);
                document.getElementById('password-change-form').reset();
                setError({status:'true' , msg:'Password changed successfuly.' , type:'success'});
            }
            else{
                setError({status:true,msg:"Password and confirm password does not match." ,type:"error"})
            }
        }else{
            setError({status:'true' , msg:'All fields are required.' , type:'error'});
        }
    }
  return (
    <>
        <Box sx={{display:'flex', flexDirection:'column' ,
        flexWrap:'wrap' ,maxWidth:600 , mx:4}}>
        <h1>Change Password</h1>
        <Box component="form" onSubmit={handleSubmit} noValidate
        sx={{mt:1}} id="password-change-form">
        <TextField margin='normal' required fullWidth name='password'
        label='New password' type="password"/>
        <TextField margin='normal' required fullWidth name="password_confirmation"
        label="Confirm password" type="password" id="password_confirmation"
        autoComplete='current-password'/>
        <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{mt:3,
            mb:2,px:5}}>Update</Button>
        </Box>
        {Error.status ? <Alert severity={Error.type}>{Error.msg}</Alert> : ""}
        </Box>
        </Box>
    </>
  )
}

export default ChangePassword