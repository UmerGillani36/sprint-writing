import { Alert, Box, Button } from '@mui/material'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { app } from '../Firebase'
import "./ForgotPassForm.css"

const ForgotPassForm = () => {

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
        }
        if(actualData.email){
            console.log(actualData);
            document.getElementById('reset-form').reset();
            setError({status:'true' , msg:'Password reset link sent' , type:'success'});

              // Admin SDK API to generate the password reset link.
              const auth = getAuth(app);
              sendPasswordResetEmail(auth,actualData.email)
              .then(() => {
                setError({status:'true' , msg:'Password reset link sent' , type:'success'});
              })
              .catch((error) => {
                // Some error occurred.
              });

        }else{
            setError({status:'true' , msg:'All fields are requird' , type:'error'});
        }
    }




  return (
    <form className='main hero-image' onSubmit={handleSubmit}>
    <div className='cover'>
    <h1>Login</h1>
    <input type="text" name='email' placeholder='email'/>
    {/* <div className='login-btn'>Login</div> */}
    <div>
    <Button style={{'backgroundColor':'goldenrod'}} className='send-btn' type='submit' variant='contained'>
                Send
    </Button>
    </div>
    <div className='create-an-account'>
    <Link to="/loginform">Click here to Login</Link>
    </div>
    {/* {error.status ?         <Alert severity={error.type} sx={{mt:2}}>{error.msg}</Alert>
        : ''} */}
      </div>
    </form>
  )
}

export default ForgotPassForm