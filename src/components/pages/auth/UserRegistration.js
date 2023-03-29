import { Alert, Box, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from './Firebase';


const UserRegistration = () => {
    //const Auth = auth();
    const [error , setError] = useState({
        status:false,
        msg:"",
        type:""

    });
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            name:data.get('name'),
            email:data.get('email'),
            password:data.get('password'),
            confirm_password:data.get('confirm-password'),
            tc:data.get('tc'),
        }
        if(actualData.name && actualData.email && actualData.password &&actualData.confirm_password && actualData.tc !== null){
            if(actualData.password === actualData.confirm_password){
                console.log(actualData);
            document.getElementById('registration-form').reset();
            setError({status:'true' , msg:'Successfuly registered' , type:'success'});
            // navigate('/');


              const auth = getAuth(app);
              createUserWithEmailAndPassword(auth,actualData.email, actualData.password)
                .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  alert("Account created")
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  alert(error.message);
                  // ..
                 });



            }else
            {
                setError({status:'true' , msg:'Passwords does not match' , type:'error'});
            }
        }else{
            setError({status:'true' , msg:'All fields are requird' , type:'error'});
        }
    }
  return (
    <>
        <Box component='form' noValidate sx={{mt: 1}} id='registration-form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth id='name' name='name' label='Name'></TextField>
        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address'></TextField>
        <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password'></TextField>
        <TextField margin='normal' required fullWidth id='confirm-password' name='confirm-password' label='Confirm password' type='password'></TextField>
        <FormControlLabel control={<Checkbox value="agree" color="primary" name="tc" id="tc"/>}label="I agree to terms and conditions."/>
        <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{mt:3,mb:2,px:5}}>
                Register
            </Button>
        </Box>
        {error.status ?         <Alert severity={error.type}>{error.msg}</Alert>
        : ''}
        </Box>
    </>
  )
}

export default UserRegistration