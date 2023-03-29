import { Alert, Box, Button, Link } from '@mui/material'
import { getAuth, signInWithEmailAndPassword ,GoogleAuthProvider ,signInWithPopup } from 'firebase/auth'
import React, { useState } from 'react'
import { Await, useNavigate } from 'react-router-dom'
import { app } from '../Firebase'
import "./VerifyOTP.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VerifyOTP = () => {



    const provider = new GoogleAuthProvider();
  
      const [error , setError] = useState({
          status:false,
          msg:"",
          type:""
      });
  
      const auth = getAuth(app);
  
  
    const goBack = () => {
      navigate('/phonenumberlogin')
    }
  
      function diffToast(params) {
        toast.error(params)
      }
  
  
      // const diffToast = (props) => {
      //   toast(props.message)
      // }
  
      const navigate = useNavigate();
      const handleSubmit = (e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const actualData = {
              otp:data.get('otp'),
          }
          if(actualData.otp){
              console.log(actualData);
              document.getElementById('login-form').reset();
              setTimeout(()=>{
                  
  
  
  
                // window.confirmationResult = confirmationResult;
                // confirmationResult.confirm(actualData.otp).then((result) => {
                // setError({status:'true' , msg:'login success' , type:'success'});
                //  // User signed in successfully.
                // const user = result.user;
                //  }).catch((error) => {
                //     alert(error)
                //  // User couldn't sign in (bad verification code?)
                // });
  
  
  
  
              },0)
          }else{
  
              setError({status:'true' , msg:'All fields are requird' , type:'error'});
              diffToast("All fields are required");
          }
      }
  
  
  
  
    return (
      <Box className='main hero-image' component='form' noValidate id='login-form' onSubmit={handleSubmit}>
      <div className='main-cover'>
      <div className='cover'>
      <h1>OTP verification</h1>
      <input type="text" name='otp' placeholder='enter otp here'/>
      {/* <div className='login-btn'>Login</div> */}
      <div style={{'display':'flex' , 'gap':'20px'}}>
      <Button onClick={goBack} style={{'backgroundColor':'goldenrod'}} className='login-btn' type='submit' variant='contained' >
                  Go back
      </Button>
      <Button style={{'backgroundColor':'goldenrod'}} className='login-btn' type='submit' variant='contained' >
                  Verify
      </Button>
      </div>
        </div>
        {/* {error.status ?         <Alert severity={error.type} sx={{mt:2}}>{error.msg}</Alert>
          : ''} */}
        </div>
        <ToastContainer />
      </Box>
    )
  }
  

export default VerifyOTP