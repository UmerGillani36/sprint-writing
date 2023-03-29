import React, { useState } from 'react'
import { TextField , Button ,Box ,Alert } from '@mui/material'
import { NavLink , useNavigate} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from './Firebase';

const UserLogin = () => {
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
            email:data.get('email'),
            password:data.get('password'),
        }
        if(actualData.email && actualData.password){
            console.log(actualData);
            document.getElementById('login-form').reset();
            setError({status:'true' , msg:'login success' , type:'success'});
            setTimeout(()=>{
                



                const auth = getAuth(app);
                signInWithEmailAndPassword(auth, actualData.email, actualData.password)
                  .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    alert("Success")
                    navigate('/dashboard')
                    // ...
                  })
                  .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(error.message)
                  });




            },0)
        }else{
            setError({status:'true' , msg:'All fields are requird' , type:'error'});
        }
    }
  return (
    <>
        <Box component='form' noValidate sx={{mt: 1}} id='login-form' onSubmit={handleSubmit}>
        <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address'></TextField>
        <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password'></TextField>
        <Box textAlign='center'>
            <Button type='submit' variant='contained' sx={{mt:3,mb:2,px:5}}>
                Login
            </Button>
        </Box>
        <NavLink to='/sendpasswordresetemail'>Forgot Password?</NavLink>
        {error.status ?         <Alert severity={error.type} sx={{mt:2}}>{error.msg}</Alert>
        : ''}
        </Box>
    </>
  )
}

export default UserLogin